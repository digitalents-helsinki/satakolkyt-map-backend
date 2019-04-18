import { aql } from 'arangojs'
import { db } from '@/config/arangodb'

const collection = db.collection('cleaninfos')

interface ICleanInfoModel {
  '_key' ?: string
  '_id' ?: string
  '_rev' ?: string
  'date' ?: string
  'organizer_name' ?: string
  'leader_name' ?: string
  'leader_email' ?: string
  'leader_phone' ?: string
  'group_size' ?: number
  'trash_amount' ?: number
  'trash_left' ?: boolean
}

export default class CleanInfoModel {
  static async getCleanInfos(): Promise<ICleanInfoModel[]> {
    const cursor = await db.query(aql`
      FOR doc IN ${collection}
        RETURN doc
    `)

    return cursor.all()
  }
  static async updateCleaned(key: string, data: any) {
    return collection.update(key, data, {
      mergeObjects: false
    })
  }
}
