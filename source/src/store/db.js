import Dexie, { Table } from 'dexie'

export class SqlitegnsDB extends Dexie {
	constructor() {
		super('sqlitegns-db')
		this.version(1).stores({
			"sqlitegns-filehandles-store": 'name,handle'
		})
	}
}
export class SqlitegnsStateDB extends Dexie {
	constructor() {
		super('sqlitegns-state-db')
		this.version(1).stores({
			ItemTable: 'name,value'
		})
	}
}
export const sqlitegns_db = new SqlitegnsDB()
export const sqlitegns_state_db = new SqlitegnsStateDB()
