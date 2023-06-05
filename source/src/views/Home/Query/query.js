import React, { useEffect, useLayoutEffect, useState, useRef, createRef, useContext } from "react"
import { Divider, Button, message, Space } from 'antd'
import { CaretRightOutlined, DownloadOutlined } from '@ant-design/icons'
import Splitter from 'm-react-splitters'
import MonacoSQLEditor from './MonacoSQLEditor'
import './highlight.css'
import hljs from 'highlight.js/lib/core'
import highlightSql from 'highlight.js/lib/languages/sql'
import { HotTable } from '@handsontable/react'
import { useStoreContext, useDispatchStoreContext } from '../../../store'
import ExcelJS from "exceljs"

hljs.registerLanguage('sql', highlightSql)

const Query = ({ fn_ref }) => {
	const store = useStoreContext()
	const storeDispatch = useDispatchStoreContext()
	const ref = useRef(null)
	const editorRef = useRef(null)
	const [queryResults, setQueryResults] = useState([])
	const listHotTableRefs = useRef([])
	useEffect(_ => {
		for (const node of ref.current.querySelectorAll('pre code')) {
			if (node.childElementCount == 0) {
				hljs.highlightElement(node)
			}
		}
	})
	useLayoutEffect(_ => {
		const handleResize = _ => {
			const rect = ref.current.parentNode.parentNode.getBoundingClientRect()
			ref.current.style.height = `${window.innerHeight - rect.top}px`
			const elmHandleBar = ref.current.getElementsByClassName("handle-bar")
			if (elmHandleBar.length > 0) {
				const elmHandleBarRect = elmHandleBar[0].getBoundingClientRect()
				for (const hot of listHotTableRefs.current) {
					const tableHeight = 24 * (1 + 1 + hot.current.hotInstance.getData().length)
					if (document.defaultView.getComputedStyle(ref.current.parentNode, null).display !== "none") {
						hot.current.hotInstance.updateSettings({
							height: Math.min(window.innerHeight - elmHandleBarRect.top - 20, tableHeight)
							, viewportRowRenderingOffset: "auto"
						})
					}
				}
			}
		}
		fn_ref.current = {
			onChange: _ => {
				setTimeout(() => {
					handleResize()
				}, 0)
			}
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return _ => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const exportData = async index => {
		try {
			const ref_table = listHotTableRefs.current[index]
			const hot = ref_table.current.hotInstance
			const workbook = new ExcelJS.Workbook()
			const sheet = workbook.addWorksheet("SQL")
			sheet.addRows([hot.getColHeader()])
			sheet.addRows(hot.getData())
			const handle = await window.showSaveFilePicker()
			const writer = await handle.createWritable()
			await writer.truncate(0)
			await writer.write(await workbook.xlsx.writeBuffer())
			await writer.close()
			message.success(`Exported to ${handle.name}`)
		} catch (err) {
			message.error(`Error: ${err}`)
		}
	}
	const execQuery = _ => {
		if (store == null) {
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

		let hotTableHeight = 100
		const elmHandleBar = ref.current.getElementsByClassName("handle-bar")
		if (elmHandleBar.length > 0) {
			const elmHandleBarRect = elmHandleBar[0].getBoundingClientRect()
			hotTableHeight = window.innerHeight - elmHandleBarRect.top - 20
		}

		let refreshTable = false
		let maxnum = -1
		listHotTableRefs.current = []
		const db = store.database
		let ret = []
		for (const sql of sqlArray) {
			const tmpSql = sql.trim()
			if (tmpSql.length > 0) {
				const key = `sqlResult_${ret.length}`
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
					ret.push(<div key={key}>
						<Divider orientation="left" orientationMargin={10}></Divider>
						<pre><code className="sql">{m[1]}</code></pre>
					</div>)
				} else if (db) {
					if (ret.length == 0) {
						db.exec("begin immediate transaction")
					}
					try {
						const stmt = db.prepare(tmpSql)
						const colHeaders = stmt.getColumnNames()
						let data = []
						while (stmt.step()) {
							data.push(stmt.get())
							if (maxnum > 0 && data.length >= maxnum) {
								break
							}
						}
						stmt.free()
						if (tmpSql.match(/\s*(ALTER|CREATE|DROP)/i)) {
							refreshTable = true
						}
						if (colHeaders.length === 0) {
							if (data.length === 0) {
								const res = db.exec("SELECT CHANGES()")
								let retStr = ""
								if (res && res.length == 1 && res[0].values && res[0].values.length == 1) {
									const num = res[0].values[0][0]
									let numStr = ""
									if (num === 0) {
										numStr = "no rows"
									} else if (num === 1) {
										numStr = "1 row"
									} else {
										numStr = `${num} rows`
									}
									let checkSql = tmpSql
									if (checkSql.match(/\s*WITH/i)) {
										let comment = false
										let arr = []
										for (const c of checkSql) {
											if (c === "'") {
												comment = !comment
												continue
											}
											if (comment) {
												continue
											}
											arr.push(c)
										}
										checkSql = arr.join("")
										let brackets = 0
										arr = []
										for (const c of checkSql) {
											if (c === "(") {
												++brackets
												continue
											}
											if (c === ")") {
												--brackets
												continue
											}
											if (brackets <= 0) {
												arr.push(c)
											}
										}
										checkSql = arr.join("").replace(/\s*WITH\s+(.+?)\s+AS(\s|,)\s+/i, '')
									}
									if (checkSql.match(/\s*INSERT/i)) {
										retStr = `Inserted ${numStr}`
									} else if (checkSql.match(/\s*UPDATE/i)) {
										retStr = `Updated ${numStr}`
									} else if (checkSql.match(/\s*DELETE/i)) {
										retStr = `Deleted ${numStr}`
									} else if (checkSql.match(/\s*REPLACE/i)) {
										retStr = `Replaced ${numStr}`
									} else {
										retStr = `Done ${numStr}`
									}
								}
								//
								ret.push(<div key={key}>
									<Divider orientation="left" orientationMargin={10}>Query</Divider>
									<pre><code className="sql">{tmpSql}</code></pre>
									<Divider orientation="left" orientationMargin={10}>{retStr}</Divider>
								</div>
								)
							}
						} else {
							const table_index = listHotTableRefs.current.length
							listHotTableRefs.current.push(createRef())
							const tableHeight = 24 * (1 + 2 + data.length)
							ret.push(<div key={key}>
								<Divider orientation="left" orientationMargin={10}>Query</Divider>
								<pre><code className="sql">{tmpSql}</code></pre>
								<Divider orientation="left" orientationMargin={10}>Result</Divider>
								<Space.Compact block>
									<Button type="primary" ghost onClick={_ => exportData(table_index)}><DownloadOutlined />Excel</Button>
								</Space.Compact>
								<br />
								<div>
									<HotTable
										ref={listHotTableRefs.current[table_index]}
										colHeaders={colHeaders}
										data={data}
										rowHeaders={true}
										width="100%"
										height={Math.min(hotTableHeight, tableHeight)}
										minSpareRows={0}
										contextMenu={true}
										manualColumnResize={true}
										manualRowResize={true}
										autoWrapCol={false}
										autoWrapRow={false}
										minRows={1}
										trimWhitespace={false}
										outsideClickDeselects={false}
									/></div>
							</div>
							)
						}
					} catch (e) {
						try {
							db.exec("rollback")
						} catch { }
						try {
							db.exec("begin immediate transaction")
						} catch { }
						ret.push(<div key={key}>
							<Divider orientation="left" orientationMargin={10}>Query</Divider>
							<pre><code className="sql">{tmpSql}</code></pre>
							<Divider orientation="left" orientationMargin={10}>Result</Divider>
							<div>{e.toString()}</div></div>)
						setQueryResults(ret)
						continue
					}
				} else {
					ret.push(<div key={key}>
						<Divider orientation="left" orientationMargin={10}>Query</Divider>
						<pre><code className="sql">{tmpSql}</code></pre>
						<Divider orientation="left" orientationMargin={10}>Result</Divider>
						<div>Error!</div></div>)
				}
				setQueryResults(ret)
			}
		}
		if (ret.length > 0) {
			try {
				db.exec("rollback")
			} catch { }
		}
		if (refreshTable) {
			///// create, drop, alter
			db.refresh()
			storeDispatch({ type: "RefreshDatabase", store: db })
		}
	}
	const pasteText = e => {
		editorRef.current?.insertText(e.currentTarget.getAttribute('data-text-begin'), e.currentTarget.getAttribute('data-text-end'))
	}

	return (
		<div ref={ref}
		>
			<Splitter
				position="horizontal"
				primaryPaneMaxHeight="100%"
				primaryPaneMinWidth={0}
				primaryPaneMinHeight={0}
				primaryPaneWidth="20px"
			>
				<div style={{ height: "100%" }}>
					<div>
						<Button type="primary" onClick={execQuery}><CaretRightOutlined /> Execute</Button>
						<Divider type="vertical" />
						<Space.Compact>
							<Button onClick={pasteText} data-text-begin="#" data-text-end=";" >COMMENT</Button>
							<Button onClick={pasteText} data-text-begin="#searchmax=" data-text-end=";" >MAXNUM</Button>
							<Button onClick={pasteText} data-text-begin="COMMIT;" >COMMIT</Button>
							<Button onClick={pasteText} data-text-begin="ROLLBACK;" >ROLLBACK</Button>
						</Space.Compact>
					</div>
					<div style={{ height: "calc(100% - 31px)" }}>
						<MonacoSQLEditor ref={editorRef} submit={execQuery} />
					</div>
				</div>
				<div className="placeholder _2" style={{ overflow: "auto", margin: "0" }}>
					<div style={{ width: "100%", height: "100%" }}>{queryResults}</div>
				</div>
			</Splitter>
		</div>
	)
}
export default Query
