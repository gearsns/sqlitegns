import React, { useRef, createRef, forwardRef, useState, useImperativeHandle } from "react"
import { Tabs } from 'antd'
import { ConsoleSqlOutlined, EditOutlined } from '@ant-design/icons'
import Query from './query'
import Edit from './edit'
import "./index.css"

const QueryArea = forwardRef((props, ref) => {
	const defaultPanes = []
	useImperativeHandle(ref, () => ({
		addQuery() {
			_addQuery()
		},
		addEdit() {
			_addEdit()
		}
	}))

	const [activeKey, setActiveKey] = useState(/*defaultPanes[0].key*/)
	const [items, setItems] = useState(defaultPanes)
	const newTabIndex = useRef(0)
	const onChange = (key) => {
		const targetIndex = items.findIndex((pane) => pane.key === key)
		for (const item of items) {
			if (item.ref) {
				item.ref.current.onChange(item === items[targetIndex])
			}
		}
		if (items[targetIndex].ref) {
			items[targetIndex].ref.current.onChange()
		}
		setActiveKey(key)
	}
	const _addQuery = () => {
		const newActiveKey = `newTab${newTabIndex.current++}`
		const ref = createRef()
		setItems([
			...items,
			{
				label: <><ConsoleSqlOutlined /> Query</>,
				children: <Query fn_ref={ref} />,
				key: newActiveKey,
				ref: ref,
			},
		])
		setActiveKey(newActiveKey)
	}
	const _addEdit = () => {
		const newActiveKey = `newTab${newTabIndex.current++}`
		const ref = createRef()
		setItems([
			...items,
			{
				label: <><EditOutlined /> Edit</>,
				children: <Edit fn_ref={ref} />,
				key: newActiveKey,
				ref: ref,
			},
		])
		setActiveKey(newActiveKey)
	}
	const remove = (targetKey) => {
		const targetIndex = items.findIndex((pane) => pane.key === targetKey)
		const newPanes = items.filter((pane) => pane.key !== targetKey)
		if (newPanes.length && targetKey === activeKey) {
			const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex]
			setActiveKey(key)
		}
		setItems(newPanes)
	}
	const onEdit = (targetKey, action) => {
		if (action === 'add') {
			add()
		} else {
			remove(targetKey)
		}
	}

	return (
		<div
			style={{
				width: "100%", top: "0px", position: "absolute"
			}}
		>
			<Tabs
				hideAdd
				onChange={onChange}
				activeKey={activeKey}
				type="editable-card"
				onEdit={onEdit}
				items={items}
			/>
		</div>
	)
})
export default QueryArea
