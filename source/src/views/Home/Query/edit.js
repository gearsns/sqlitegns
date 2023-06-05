import React, { useRef, useEffect, useLayoutEffect, useContext, useState, createRef } from "react"
import { Divider, AutoComplete, Button, Input, Space } from 'antd'
import { EnterOutlined, UndoOutlined, RedoOutlined, InsertRowBelowOutlined, SearchOutlined } from '@ant-design/icons'
import Splitter from 'm-react-splitters'
import { HotTable } from '@handsontable/react'
import Handsontable from 'handsontable'
import { useStoreContext } from '../../../store'
import * as lodash from 'lodash'
import MonacoSQLEditor from './MonacoSQLEditor'

const roundNull = e => {
	if (e === null || e === undefined) {
		return null
	}
	return e
}

Handsontable.renderers.registerRenderer('my.text', function customTextRenderer(hotInstance, td, row, column, prop, value, cellProperties) {
	Handsontable.renderers.BaseRenderer.apply(this, arguments)
	const customSettings = hotInstance.getSettings().customSettings
	const headers = customSettings.headers
	const colIndexOrgIndex = customSettings.colIndexOrgIndex
	const colIndexDelete = customSettings.colIndexDelete
	const data = customSettings.data
	const orgData = customSettings.orgData
	if (column < headers.length && row <= orgData.length - 1) {
		cellProperties.readOnly = headers[column].pk
	}
	let classList = [];
	if (cellProperties.readOnly) {
		classList.push("readonly")
	}
	const oIndex = data[row][colIndexOrgIndex]
	if (orgData[oIndex]) {
		if (roundNull(orgData[oIndex][column]) !== roundNull(value)) {
			classList.push("modified")
		}
	} else {
		if (row < data.length - hotInstance.getSettings().minSpareRows) {
			if (data[row][colIndexDelete] === true) {
				classList.push("remove")
			} else {
				classList.push("addrow")
			}
		} else {
			classList.push("newrow")
		}
	}
	if (roundNull(value) === null && !classList.includes("newrow")) {
		classList.push("nullvalue")
	}
	td.className = classList.join(" ")
	td.textContent = value
})

Handsontable.renderers.registerRenderer('my.delete?',
	function customDeleteRenderer(hotInstance, td, row, column, prop, value, cellProperties) {
		if (row >= hotInstance.countRows() - 1) {
			Handsontable.renderers.BaseRenderer.apply(this, arguments)
			cellProperties.readOnly = true
		} else {
			Handsontable.renderers.CheckboxRenderer.apply(this, arguments)
			cellProperties.readOnly = false
		}
	})

const Edit = ({ fn_ref }) => {
	const [tablename, setTablename] = useState('')
	const store = useStoreContext()
	const [queryResults, setQueryResults] = useState([])
	const [queryComment, setQueryComment] = useState([])
	const ref = useRef(null)
	const hotTableRef = useRef(null)
	const editorRef = useRef(null)

	const handleResize = _ => {
		const rect = ref.current.parentNode.parentNode.getBoundingClientRect()
		ref.current.style.height = `${window.innerHeight - rect.top}px`
		const elmHandleBar = ref.current.getElementsByClassName("handle-bar")
		const elmsFunctionArea = ref.current.getElementsByClassName("edit-function-area")
		if (elmHandleBar.length > 0 && elmsFunctionArea.length > 0) {
			const elmEditFunctionAreaRect = elmsFunctionArea[0].getBoundingClientRect()
			const elmMainRect = ref.current.getElementsByTagName("main")[0].getBoundingClientRect()
			const hot = hotTableRef
			if (hot.current.hotInstance) {
				if (document.defaultView.getComputedStyle(ref.current.parentNode, null).display !== "none") {
					hot.current.hotInstance.updateSettings({
						height: elmMainRect.bottom - elmEditFunctionAreaRect.bottom
					})
				}
			}
		}
	}
	useLayoutEffect(_ => {
		handleResize()
		fn_ref.current = {
			onChange: _ => {
				setTimeout(() => {
					if (hotTableRef.current) {
						handleResize()
					}
				}, 0)
			}
		}
		window.addEventListener('resize', handleResize)
		return _ => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	useEffect(() => {
		handleResize()
	}, [queryResults])
	//
	const setDelete = (row, deleteFlag) => {
		const hot = hotTableRef.current.hotInstance
		hot.setDataAtCell(row, hot.countCols() - 1, deleteFlag)
	}
	const undoEdit = _ => {
		const hot = hotTableRef.current.hotInstance
		hot.undo()
	}
	const redoEdit = _ => {
		const hot = hotTableRef.current.hotInstance
		hot.redo()
	}
	const insertRow = _ => {
		const hot = hotTableRef.current.hotInstance
		hot.alter('insert_row', hot.countRows())
	}
	//
	const getDefTable = _ => tablename.trim()
	//
	const execQuery = _ => {
		if (store == null) {
			return
		}

		const tableName = tablename.trim()
		if (!store.database && store.database.table_info) {
			setQueryResults(<div>file open</div>)
			return
		}
		const text = editorRef.current.getValue()
		const re = /(^\s*REM(?:\n|\s.*?(?:\n|$)))|('(?:\.|(?:\')|[^\''\n])*')|("(?:\.|(?:\")|[^\""\n])*")|;/ig
		const sqlArray = text.replace(re, (match, rem) => {
			if (match == ";") {
				return "\0"
			} else if (rem) {
				return `#${match.trimEnd()}\0`
			}
			return match
		}).split("\0")
		const db = store.database
		let data = []
		let orgData = []
		let headers = []
		let maxnum = -1
		if (text.trim().length == 0) {
			if (db) {
				const key = `sqlResult_1`
				let trets = null
				try {
					trets = db.exec(`select * from ${tableName}`)
				} catch (e) {
					setQueryResults(<div key={key}><pre></pre><div>{e.toString()}</div></div>)
					return
				}
				for (const tret of trets) {
					data = data.concat(tret.values)
				}
			}
		}
		for (const sql of sqlArray) {
			const tmpSql = sql.trim()
			if (tmpSql.length > 0) {
				const m = /^\s*(?:#|REM)([\s\S]*)/ig.exec(tmpSql)
				if (m) {
					const m1 = /^(.*?)=(.*)$/g.exec(m[1])
					if (m1) {
						switch (m1[1].toLowerCase()) {
							case "searchmax":
								maxnum = parseInt(m1[2], 10)
								break
						}
					}
				} else if (db) {
					const key = `sqlResult_1`
					try {
						const stmt = db.prepare(`select * from ${tableName} ${tmpSql}`)
						while (stmt.step()) {
							data.push(stmt.get())
							if (maxnum > 0 && data.length >= maxnum) {
								break
							}
						}
						stmt.free()
					} catch (e) {
						setQueryResults(<div key={key}><pre><code className="sql">{tmpSql}</code></pre><div>{e.toString()}</div></div>)
						return
					}
					if (maxnum > 0 && data.length > maxnum) {
						break
					}
				}
			}
		}
		// 更新用のユニークキーが設定されているかどうか
		let fields = db.fields(tableName)
		if (fields.length == 0) {
			setQueryResults(<div>データが見つかりませんでした。</div>)
			return
		}
		//
		let row = 0
		for (const item of data) {
			item.push(false) // colIndexDelete
			item.push(row) // colIndexOrgIndex
			row += 1
		}
		//
		headers = lodash.cloneDeep(fields) // フィルタリングするかも
		let columns = []
		let colHeaders = []
		let isNoUniqIndex = true
		for (const item of headers) {
			columns.push({
				renderer: 'my.text'
			})
			if (item.pk) {
				colHeaders.push(`${item.name}(*)`)
				isNoUniqIndex = false
			} else {
				colHeaders.push(item.name)
			}
		}
		//
		orgData = lodash.cloneDeep(data)
		// 削除用の列作成
		colHeaders.push("delete?")
		columns.push({
			type: "checkbox",
			renderer: 'my.delete?'
		})
		const colIndexDelete = colHeaders.length - 1
		const colIndexOrgIndex = colHeaders.length
		const colIndexModify = colHeaders.length + 1
		const colIndexError = colHeaders.length + 2
		const isDelete = row => data[row][colIndexDelete] === true
		const isError = row => data[row][colIndexError] !== undefined
		const rowHeadersFunc = row => `<span class='${isError(row) ? ' hasError' : ''}' title="${data[row][colIndexError]}"></span><span class='trash_icon${isDelete(row) ? ' trash_on' : ''}'></span>${row + 1}`
		//
		const settings = {}
		settings.colIndexDelete = colIndexDelete
		settings.colIndexOrgIndex = colIndexOrgIndex
		settings.colIndexModify = colIndexModify
		settings.colIndexError = colIndexError
		settings.isDelete = isDelete
		settings.isError = isError
		settings.rowHeadersFunc = rowHeadersFunc
		settings.headers = headers
		settings.data = data
		settings.orgData = orgData
		//
		data.push(colHeaders.map(_ => null))
		setQueryResults(<>
			<div className="edit-function-area">
				{isNoUniqIndex
					? <span>A unique index does not exist</span>
					: <>
						<Button type="primary" className="commit_button" danger onClick={updateQuery}><EnterOutlined /> Commit</Button>
						<Divider type="vertical" />
						<Space.Compact>
							<Button className="commit_button" danger onClick={undoEdit}><UndoOutlined /> UNDO</Button>
							<Button className="commit_button" danger onClick={redoEdit}><RedoOutlined /> REDO</Button>
							<Button className="commit_button" danger onClick={insertRow}><InsertRowBelowOutlined /> INSERT</Button>
						</Space.Compact>
					</>
				}
			</div>
			<HotTable ref={hotTableRef}
				customSettings={settings}
				colHeaders={colHeaders}
				rowHeaders={rowHeadersFunc}
				manualColumnResize={true}
				manualRowResize={true}
				autoWrapCol={false}
				autoWrapRow={false}
				data={data}
				width="100%"
				minRows={1}
				minSpareRows={isNoUniqIndex ? 0 : 1}
				rowHeaderWidth={70}
				columns={columns}
				trimWhitespace={false}
				outsideClickDeselects={false}
				afterOnCellMouseDown={
					(event, cords, td) => {
						if (cords.col < 0 && event.target.classList.contains("trash_icon")) {
							if (data[cords.row][colIndexDelete] === true) {
								setDelete(cords.row, false)
								event.target.classList.remove("trash_on")
							} else {
								setDelete(cords.row, true)
								event.target.classList.add("trash_on")
							}
						}
					}
				}
				afterChange={
					(changes, source) => {
						if (source === 'loadData') {
							return
						}
						for (const change of changes) {
							if (change[2] === change[3]) {
								continue
							}
							data[change[0]][colIndexModify] = true
						}
					}
				}
				contextMenu="true"
			/>
		</>)
	}
	const updateQuery = _ => {
		const tableName = tablename.trim()
		if (!store.database && store.database.table_info) {
			return
		}
		const hot = hotTableRef.current.hotInstance
		setQueryComment("Update!!")
		for (const e of ref.current.getElementsByClassName("commit_button")) {
			e.classList.add("isDisable")
		}
		const modifiedItems = []
		let rowIndex = 0
		const customSettings = hot.getSettings().customSettings
		const headers = customSettings.headers
		const colIndexOrgIndex = customSettings.colIndexOrgIndex
		const colIndexDelete = customSettings.colIndexDelete
		const colIndexError = customSettings.colIndexError
		const colIndexModify = customSettings.colIndexModify
		const data = customSettings.data
		const orgData = customSettings.orgData
		for (const rowItem of data) {
			++rowIndex
			rowItem[colIndexError] = undefined
			if (!rowItem[colIndexModify]) {
				continue
			}
			if (roundNull(rowItem[colIndexOrgIndex]) !== null) {
				const orgRowItem = orgData[rowItem[colIndexOrgIndex]]
				if (rowItem[colIndexDelete]) {
					let keys = {}
					for (let col = 0; col < headers.length; ++col) {
						if (headers[col].pk) {
							keys[headers[col].name] = orgRowItem[col]
						}
					}
					modifiedItems.push({
						type: "delete",
						keys: keys,
						rowIndex: rowIndex
					})
				} else {
					let keys = {}
					let item = {}
					for (let col = 0; col < headers.length; ++col) {
						if (headers[col] && headers[col].pk) {
							keys[headers[col].name] = orgRowItem[col]
						}
						if (roundNull(rowItem[col]) !== roundNull(orgRowItem[col])) {
							item[headers[col].name] = rowItem[col]
						}
					}
					if (Object.keys(item).length > 0) {
						modifiedItems.push({
							type: "update",
							keys: keys,
							data: item,
							rowIndex: rowIndex
						})
					}
				}
			} else if (!rowItem[colIndexDelete]) {
				let item = {}
				for (let col = 0; col < headers.length; ++col) {
					item[headers[col].name] = rowItem[col]
				}
				modifiedItems.push({
					type: "insert",
					data: item,
					rowIndex: rowIndex
				})
			}
		}
		if (modifiedItems.length === 0) {
			setQueryComment("A modified items does not exists.")
			for (const e of ref.current.getElementsByClassName("commit_button")) {
				e.classList.remove("isDisable")
			}
			return
		}
		const error_list = store.database.batchExceute(tableName, modifiedItems)
		if (error_list.length == 0) {
			execQuery()
			setQueryComment(`Update:${modifiedItems.length}`)
		} else {
			let arr = []
			for (const error of error_list) {
				if (error["ROW"]) {
					arr.push(["ERROR", error['ROW'], error['ERROR']])
					data[error['ROW'] - 1][colIndexError] = error['ERROR']
				}
			}
			setQueryComment(<>Error：{error_list.length}<br />{`${arr}`}</>)
			hot.render()
		}
		for (const e of ref.current.getElementsByClassName("commit_button")) {
			e.classList.remove("isDisable")
		}
	}
	const [options, setOptions] = useState([])
	const onSearch = (searchText) => {
		let items = []
		if (store.database && store.database.table_info) {
			if (searchText.length == 0) {
				for (const table of store.database.table_info) {
					items.push({ value: table.name })
					if (items.length > 20) {
						break
					}
				}
			} else {
				let regtext = `.*${searchText.split('').join(".*")}.*`
				let re = new RegExp(regtext, 'gi')
				for (const table of store.database.table_info) {
					if (table.name.match(re)) {
						items.push({ value: table.name })
					}
				}
			}
		}
		setOptions(items)
	}
	useEffect(_ => {
		onSearch(tablename)
	}, [store])
	const onChange = (data) => {
		setTablename(data)
	}
	const pasteText = e => {
		editorRef.current?.insertText(e.currentTarget.getAttribute('data-text-begin'), e.currentTarget.getAttribute('data-text-end'))
	}
	return (
		<div ref={ref}>
			<Splitter
				position="horizontal"
				primaryPaneMaxHeight="100%"
				primaryPaneMinWidth={0}
				primaryPaneMinHeight={0}
				primaryPaneWidth="20px"
				primaryPaneHeight="90%"
			>
				<main style={{ height: "100%" }}>
					<Splitter
						position="horizontal"
						primaryPaneMaxHeight="100%"
						primaryPaneMinWidth={0}
						primaryPaneMinHeight={0}
						primaryPaneWidth="20px"
					>
						<div style={{ height: "100%" }}>
							<div style={{ height: "32px" }}>
								<AutoComplete
									value={tablename}
									options={options}
									style={{

										width: 400,
										top: "-5px",
									}}
									onSearch={onSearch}
									onChange={onChange}
								><Input.Search
										addonBefore={<SearchOutlined />}
										size="middle"
										placeholder="Enter table name here"
										onSearch={execQuery}
										enterButton="Search" />
								</AutoComplete>
								<Divider type="vertical" />
								<Space.Compact>
									<Button onClick={pasteText} data-text-begin="#" data-text-end=";" >COMMENT</Button>
									<Button onClick={pasteText} data-text-begin="#searchmax=" data-text-end=";" >MAXNUM</Button>
								</Space.Compact>
							</div>
							<div style={{ height: "calc(100% - 31px)" }}>
								<MonacoSQLEditor ref={editorRef} submit={execQuery} getDefTable={getDefTable} />
							</div>
						</div>
						<div className="placeholder _2" style={{ display: "block", overflow: "auto", margin: "0" }}>
							<div style={{ width: "100%", height: "100%" }}>{queryResults}</div>
						</div>
					</Splitter>
				</main>
				<footer className="11" style={{ width: "100%", top: "100%", display: "block", overflow: "auto", margin: "0", height: "100%" }}>
					<div style={{ width: "100%", height: "100%" }}>{queryComment}</div>
				</footer >
			</Splitter>
		</div>
	)
}
export default Edit
