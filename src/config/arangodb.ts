import { Database, aql } from 'arangojs'
import { config } from './index'

const connectionConfig = {
  username: config.arangodb.username,
  password: config.arangodb.password,
  database: config.arangodb.database,
  url: config.arangodb.url  
}

export const db = new Database({ url: connectionConfig.url })

export const connect = async () => {
  try {
    const { username, password, database } = connectionConfig

    db.useBasicAuth(username, password)
    db.useDatabase(database)

    // Makes sure that the connection actually is valid and working.
    await db.query(aql`RETURN 0`)

    return Promise.resolve()
  } catch (err) {
    return Promise.reject(err.message)
  }
}
