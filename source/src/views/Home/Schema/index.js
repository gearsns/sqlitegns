import React, { useState, useEffect } from "react"
import { ConsoleSqlOutlined, EditOutlined, FileOutlined, SaveOutlined, TableOutlined, MenuOutlined, KeyOutlined, TagOutlined, DatabaseOutlined, ExportOutlined } from '@ant-design/icons'
import { Menu, Modal, message, Upload } from 'antd'
import { useStoreContext, useDispatchStoreContext } from '../../../store'
import { sqlitegns_db, sqlitegns_state_db } from '../../../store/db'
import { useLiveQuery } from "dexie-react-hooks"

import Database from '../../../lib/database'

const { Dragger } = Upload

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}

const Schema = props => {
  const [db_tables, setTables] = useState([])
  const store = useStoreContext()
  const storeDispatch = useDispatchStoreContext()
  const [openSave, setSaveOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const database = new Database()

  const createDB = async _ => {
    await database.create()
    setTables([])
    storeDispatch({ type: "Set", store: { database: database, fileHandle: null } })
  }
  useEffect(_ => { createDB() }, [])
  useEffect(_ => {
    let items = []
    if (store.database && store.database.table_info) {
      for (const table of store.database.table_info) {
        let fields = []
        for (const field of table.fields) {
          // NULL,INTEGER,REAL,TEXT,BLOB
          const field_name = field["name"]
          const field_type = field["type"]
          let field_key_icon = field["pk"] == 1 ? <KeyOutlined /> : <TagOutlined />
          if (field_type && field_type.length > 0) {
            fields.push(getItem(<span>{field_name} [{field_type}]</span>, `${table.name}.${field_name}`, field_key_icon))
          } else {
            fields.push(getItem(<span>{field_name}</span>, `${table.name}.${field_name}`, field_key_icon))
          }
        }
        items.push(getItem(table.name, table.name, <TableOutlined />, fields))
      }
    }
    setTables(items)
  }, [store])
  const openDB = async (filename) => {
    try {
      let storeFileHandle = null
      if (typeof filename === 'string') {
        await sqlitegns_db.table("sqlitegns-filehandles-store")
          .where("name").equals(filename)
          .first()
          .then(item => {
            storeFileHandle = item.handle
          })
      } else if (typeof filename === 'object') {
        storeFileHandle = filename
      }
      await database.open(storeFileHandle)
      const fileHandle = database.fileHandle
      if (fileHandle) {
        await sqlitegns_db.table("sqlitegns-filehandles-store").put({
          name: fileHandle.name,
          handle: fileHandle
        })
        let itemtable = null
        await sqlitegns_state_db.table("ItemTable")
          .where("name").equals("recently.opened")
          .first()
          .then(item => {
            itemtable = item
          })
        if (itemtable) {
          if (itemtable.value["entries"]) {
            itemtable.value["entries"] = itemtable.value["entries"].filter((elem, index, self) =>
              elem.name != fileHandle.name
            )
            itemtable.value["entries"].push({ "fileUri": `file:///${fileHandle.name}`, name: fileHandle.name })
            itemtable.value["entries"] = itemtable.value["entries"].slice(-5)
          }
        } else {
          itemtable = { name: "recently.opened" }
          itemtable.value = { "entries": [{ "fileUri": `file:///${fileHandle.name}`, name: fileHandle.name }] }
        }
        await sqlitegns_state_db.table("ItemTable").put(itemtable)
      }
      storeDispatch({ type: "Set", store: { database: database, fileHandle: fileHandle } })
      message.success(`${database.file.name} file opened successfully`)
    } catch (err) {
      message.error(`file opened failed. ${err}`)
    }
  }

  const getFileMenuItems = recently_items => {
    let file_items = []
    file_items.push(getItem("New", 'new', <DatabaseOutlined />))
    file_items.push(getItem("Open", 'open', <DatabaseOutlined />))
    if (window.showSaveFilePicker) {
      if (recently_items && recently_items.length > 0) {
        file_items.push(getItem("Recent", 'recent', <MenuOutlined />, recently_items))
      } else {
        file_items.push(getItem("Recent", 'recent', <MenuOutlined />, [getItem("None", 'none')]))
      }
    }
    file_items.push(getItem("Save", 'save', <SaveOutlined />))
    if (window.showSaveFilePicker) {
      file_items.push(getItem("SaveAs", 'saveas', <ExportOutlined />))
    }
    return [
      getItem('File', 'file_menu', <MenuOutlined />, file_items)
    ]
  }
  const getRecentlyOpened = _ => {
    let itemtable = null
    let recently_items = [
      getItem("None", 'none')
    ]
    useLiveQuery(async () => {
      await sqlitegns_state_db.table("ItemTable")
        .where("name").equals("recently.opened")
        .first()
        .then(item => {
          itemtable = item
        })
      if (itemtable && itemtable.value["entries"].length > 0) {
        recently_items = []
        for (const item of itemtable.value["entries"]) {
          recently_items.push(
            getItem(item.name, item.fileUri, <FileOutlined />)
          )
        }
      }
      setFileItems(getFileMenuItems(recently_items))
    })
  }
  getRecentlyOpened()
  const [fileItems, setFileItems] = useState(getFileMenuItems(null))

  const saveDB = async _ => {
    try {
      const db = store.database
      await db.save()
      setSaveOpen(false)
      setConfirmLoading(false)
    } catch { }
  }
  const handleSaveOk = _ => {
    setConfirmLoading(true)
    saveDB()
  }
  const handleSaveCancel = _ => {
    setSaveOpen(false)
  }
  const onClick = async e => {
    switch (e.key) {
      case "new":
        createDB()
        break
      case "open":
        openDB()
        break
      case "save":
        setSaveOpen(true)
        break
      case "saveas":
        {
          const db = store.database
          if (db) {
            try {
              await db.saveAs()
            } catch { }
          }
        }
        break
      case "edit":
        if (props.addEdit) {
          props.addEdit()
        }
        break
      case "query":
        if (props.addQuery) {
          props.addQuery()
        }
        break
      default:
        {
          const m = e.key.match(/file:\/\/\/(.*)/)
          if (m) {
            openDB(m[1])
          }
        }
        break
    }
  }

  const upload_props = {
    name: 'file',
    multiple: false,
    customRequest: _ => false,
    showUploadList: false,
    onDrop: async e => {
      for (const item of e.dataTransfer.items) {
        if (item.kind === 'file') {
          const entry = await item.getAsFileSystemHandle()
          if (entry.kind === 'file') {
            openDB(entry)
            return
          }
        }
      }
    }
  }
  const editItems = [
    getItem('Edit', 'edit_menu', <MenuOutlined />, [
      getItem("Query", 'query', <ConsoleSqlOutlined />),
      getItem("Edit", 'edit', <EditOutlined />),
    ])
  ]
  return (
    <div className="app">
      <Menu
        onClick={onClick}
        defaultOpenKeys={['file_menu']}
        mode="inline"
        selectable={false}
        items={fileItems}
      />
      <Menu
        onClick={onClick}
        defaultOpenKeys={['edit_menu']}
        mode="inline"
        selectable={false}
        items={editItems}
      />
      <Menu
        mode="inline"
        selectable={false}
        items={db_tables}
      />
      <Modal
        title="Save it?"
        open={openSave}
        onOk={handleSaveOk}
        confirmLoading={confirmLoading}
        onCancel={handleSaveCancel}
      />
      <div>
        <Dragger {...upload_props}>
          <p className="ant-upload-drag-icon">
            <DatabaseOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to opened</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
            banned files.
          </p>
        </Dragger>
      </div>
    </div>
  )
}

export default Schema
