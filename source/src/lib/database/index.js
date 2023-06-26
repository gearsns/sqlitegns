import initSqlJs from "sql.js"
// Required to let webpack 4 know it needs to copy the wasm file to our assets
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm"
import { render } from "@testing-library/react"

const arrayToHash = (header, data) => {
	let item = {}
	let n = Math.min(header.length, data.length)
	for (let i = 0; i < n; ++i) {
		item[header[i]] = data[i]
	}
	return item
}

export default class Database {
	constructor() {
		this.db = null
		this.file = null
		this.fileHandle = null
		this.table_info = []
	}
	async create() {
		this.close()
		const SQL = await initSqlJs({ locateFile: () => sqlWasm })
		this.db = new SQL.Database()
		this.table_info = []
		this.file = null
		this.fileHandle = null
		return this.db
	}
	async refresh() {
		this.table_info = []
		for (const tret of this.db.exec("SELECT name, type FROM sqlite_master WHERE type in ('table','view') ORDER BY type, name")) {
			for (const trec of tret.values) {
				const titem = arrayToHash(tret.columns, trec)
				let tname = titem["name"]
				let fields_info = []
				for (const fret of this.db.exec(`PRAGMA TABLE_INFO('${tname}')`)) {
					let int_pk_num = 0
					for (const frec of fret.values) {
						const fitem = arrayToHash(fret.columns, frec)
						fields_info.push(fitem)
						if (fitem['pk'] == 1) {
							if (fitem['type'] == "INTEGER") {
								++int_pk_num
							} else {
								int_pk_num += 100
							}
						}
					}
					// AUTOINCREMENTかどうかを確認
					if (int_pk_num == 1) {
						for (const fret of this.db.exec(`SELECT 1 AS isAutoincrement FROM sqlite_master WHERE tbl_name='${tname}' AND sql LIKE '% AUTOINCREMENT%'`)) {
							for (let field of fields_info) {
								if (field['pk'] == 1) {
									field['isAutoincrement'] = true
								}
							}
						}
					}
				}
				titem["fields"] = fields_info
				this.table_info.push(titem)
			}
		}
	}
	async open(filehandle) {
		this.close()
		let arrayBuffer = null
		if (window.showOpenFilePicker) {
			if (filehandle) {
				this.fileHandle = filehandle
				// すでにユーザーの許可が得られているかをチェック
				let permission = await filehandle.queryPermission({ mode: 'readwrite' })
				if (permission !== 'granted') {
					// ユーザーの許可が得られていないなら、許可を得る（ダイアログを出す）
					permission = await filehandle.requestPermission({ mode: 'readwrite' })
					if (permission !== 'granted') {
						throw new Error('Please allow the storage access permission request.')
					}
				}
			} else {
				[this.fileHandle] = await window.showOpenFilePicker({
					types: [
						{
							description: "Sqlite file",
							accept: { "application/octet-binary": [".db", ".sqlte"] }
						}
					],
				})
			}
			this.file = await this.fileHandle.getFile()
			arrayBuffer = await this.file.arrayBuffer()
		} else {
			this.file = await new Promise(resolve => {
				const input = document.createElement('input')
				input.type = 'file'
				input.onchange = e => {
					resolve(e.target.files[0])
				}
				input.click()
			})
			arrayBuffer = await new Promise(resolve => {
				const reader = new FileReader()
				reader.readAsArrayBuffer(this.file)
				reader.onload = _ => {
					resolve(reader.result)
				}
			})
		}
		const SQL = await initSqlJs({ locateFile: () => sqlWasm })
		this.db = new SQL.Database(new Uint8Array(arrayBuffer))
		this.refresh()
	}
	async save() {
		if (window.showSaveFilePicker) {
			if (!this.fileHandle) {
				this.saveAs()
				return
			}
			const checked = await this.fileHandle.requestPermission({
				mode: "readwrite"
			});
			if (checked === "granted") {
				const writer = await this.fileHandle.createWritable()
				await writer.truncate(0)
				await writer.write(this.db.export())
				await writer.close()
			}
		} else {
			const a = document.createElement('a')
			a.href = URL.createObjectURL(new Blob([this.db.export().buffer], { type: "application/octet-binary" }))
			if (this.file) {
				a.download = this.file.name
			} else {
				a.download = 'sqlite.db'
			}
			a.style.display = 'none'
			document.body.appendChild(a)
			a.click()
			document.body.removeChild(a)
		}
	}
	async saveAs() {
		this.fileHandle = await window.showSaveFilePicker({
			types: [
				{
					description: "Sqlite file",
					accept: { "application/octet-binary": [".db"] }
				}
			]
		})
		const writer = await this.fileHandle.createWritable()
		await writer.truncate(0)
		await writer.write(this.db.export())
		await writer.close()
	}
	exec(sql) {
		return this.db.exec(sql)
	}
	prepare(sql) {
		return this.db.prepare(sql)
	}
	fields(tableName) {
		for (const table of this.table_info) {
			if (table.name == tableName) {
				return table.fields
			}
		}
		return []
	}
	get tableInfo() {
		return this.table_info
	}
	batchExceute(tableName, data) {
		const create_update_list = () => {
			const get_sql_value = (type, value, nullable) => {
				switch (type) {
					case 'INTEGER':
					case 'REAL':
					case 'BLOB':
						if (value === null || value === undefined) {
							if (nullable) {
								return "null"
							} else {
								return "1"
							}
						}
						return `${value}`
					case 'TEXT':
					case 'NUMERIC':
					case 'NONE':
						if (value === null || value === undefined) {
							if (nullable) {
								return "null"
							} else {
								return "''"
							}
						}
						return `'${value.replace(/'/, "''")}'`
					default:
						if (value === null || value === undefined) {
							if (nullable) {
								return "null"
							} else {
								return "''"
							}
						}
						return `'${value.replace(/'/, "''")}'`
				}
			}
			const create_insert_sql = (item) => {
				let item_data = item['data']
				let field_list = []
				let value_list = []
				for (const c of columns) {
					if (!c['isAutoincrement']) {
						field_list.push(c.name)
						value_list.push(get_sql_value(c['type'], item_data[c['name']], c['notnull']))
					}
				}
				return `insert into ${tableName} (${field_list.join(',')}) values (${value_list.join(",")})`
			}
			const create_update_sql = (item) => {
				let item_data = item['data']
				let item_keys = item['keys']
				let update_field = Object.keys(item_data)
				let key_field = Object.keys(item_keys)
				if (key_field.length == 0) {
					return ""
				}
				let columns_map = {}
				for (const c of columns) {
					columns_map[c['name']] = c
				}
				//
				let value_list = []
				for (const column_name of update_field) {
					let column = columns_map[column_name]
					if (!column['isAutoincrement']) {
						let value = get_sql_value(column['type'], item_data[column['name']], column['notnull'])
						value_list.push(`${column_name}=${value}`)
					}
				}
				let key_value_list = []
				for (const column_name of key_field) {
					let column = columns_map[column_name]
					let value = get_sql_value(column['type'], item_keys[column['name']], column['notnull'])
					key_value_list.push(`${column_name}=${value}`)
				}
				return `update ${tableName} set ${value_list.join(",")} where ${key_value_list.join(" and ")}`
			}
			const create_delete_sql = (item) => {
				let item_keys = item['keys']
				let key_field = Object.keys(item_keys)
				if (key_field.length == 0) {
					return ""
				}
				let columns_map = {}
				for (const c of columns) {
					columns_map[c['name']] = c
				}
				//
				let key_value_list = []
				for (const column_name of key_field) {
					let column = columns_map[column_name]
					let value = get_sql_value(column['type'], item_keys[column['name']], column['notnull'])
					key_value_list.push(`${column_name}=${value}`)
				}
				return `delete from ${tableName} where ${key_value_list.join(" and ")}`
			}
			let columns = this.fields(tableName)
			for (const item of data) {
				switch (item['type']) {
					case 'insert':
						item['SQL'] = create_insert_sql(item)
						break
					case 'update':
						item['SQL'] = create_update_sql(item)
						break
					case 'delete':
						item['SQL'] = create_delete_sql(item)
						break
				}
			}
		}
		create_update_list()

		this.exec("BEGIN TRANSACTION")
		let error_list = []
		for (const item of data) {
			if (item['SQL'] && item['SQL'].length > 0) {
				try {
					this.exec(item['SQL'])
				} catch (e) {
					error_list.push({
						ROW: item['rowIndex'],
						SQL: item['SQL'],
						ERROR: e
					})
				}
			}
		}
		if (error_list.length == 0) {
			this.exec("commit")
		} else {
			this.exec("rollback")
		}
		return error_list
	}

	close() {
		this.table_info = []
		this.view_info = []
		this.fileHandle = null
		if (this.db) {
			this.db.close()
		}
		this.db = null
	}
}
