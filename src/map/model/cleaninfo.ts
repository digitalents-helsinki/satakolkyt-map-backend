// Copyright (C) 2019 Digitalents Helsinki

import { aql } from 'arangojs'
import { db } from '@/config/arangodb'

const collection = db.collection('cleaninfos')

interface ICleanInfoModel {
  _key?: string
  _id?: string
  _rev?: string
  confirmed?: boolean
  date?: string
  organizer_name?: string
  leader_name?: string
  leader_email?: string
  leader_phone?: string
  group_size?: number
  trash_amount?: number
  trash_left?: boolean
  trash_bags_info?: string
  kurtturuusu?: string
  jattipalsami?: string
  kurtturuusu_detail?: string
  jattipalsami_detail?: string
  cleanmoreinfo?: string
  userip?: string
  timestamp?: string
  archived?: boolean
  multiID?: string
  //conf_email_sent?: boolean
  notify_email_sent?: boolean
}

export default class CleanInfoModel {
  static async getCleanInfos(): Promise<ICleanInfoModel[]> {
    const cursor = await db.query(aql`
      FOR doc IN ${collection}
        FILTER doc.archived == false
        RETURN doc
    `)

    return cursor.all()
  }

  static async getCleanedByKey(key: string): Promise<ICleanInfoModel> {
    return collection.document(key)
  }

  static async getCleanedByShoreKey(key: string): Promise<ICleanInfoModel> {
    const cursor = await db.query(aql`
      FOR doc IN ${collection}
        FILTER doc.selected.key == ${key}
        RETURN doc
    `)

    return cursor.all()
  }

  static async updateCleaned(key: string, data: any) {
    return collection.update(key, data, {
      mergeObjects: false
    })
  }

  //Obsolete at least for now
  /*static async updateEmailedByMultiID(multiID: string) {
    db.query(aql`
      FOR doc IN ${collection}
        FILTER doc.multiID == ${multiID}
        UPDATE {_key: doc._key, conf_email_sent: true} IN ${collection}
    `)
  }*/

  static async updateNotifiedByMultiID(multiID: string) {
    db.query(aql`
      FOR doc IN ${collection}
        FILTER doc.multiID == ${multiID}
        UPDATE {_key: doc._key, notify_email_sent: true} IN ${collection}
    `)
  }

  static async removeCleaned(key: string) {
    return collection
      .remove(key)
      .then(
        () => console.log('Document removed'),
        err => console.error('Failed to remove document', err)
      )
  }
}
