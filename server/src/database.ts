import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'

let db: Database<any> | undefined

export async function getDatabaseConnection() {
  if (db !== undefined)
    return db

  db = await open({
    driver: sqlite3.Database,
    filename: "./database.sqlite"
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS todo (
      id    INTEGER   PRIMARY KEY   AUTOINCREMENT, 
      text  TEXT,
      date  INT
    ) 
  `)

  return db
}
