// Copyright (C) 2019 Digitalents Helsinki

import { aql } from 'arangojs'
import { db } from '@/config/arangodb'

const collection = db.collection('reservations')

export interface IReservationModel {
  _key?: string
  _id?: string
  _rev?: string
  confirmed?: boolean
  organizer?: string
  startdate?: string
  starttime?: string
  endtime?: string
  openevent?: boolean
  openinfo?: string
  openlink?: string
  selected?: Object
  name?: string
  phonenumber?: string
  email?: string
  userip?: string
  timestamp?: string
  multiID?: string
  multiLength?: number
  conf_email_sent?: boolean
  reminder_email_sent?: boolean
  notify_email_sent?: boolean
  language?: 'fi' | 'sv' | 'en'
}

export default class ReservationModel {
  static async getReservations(): Promise<IReservationModel[]> {
    const cursor = await db.query(aql`
      FOR doc IN ${collection}
        RETURN doc
    `)

    return cursor.all()
  }
  static async getReservation(key: string): Promise<IReservationModel> {
    return collection.document(key)
  }

  static async getReservationByShoreKey(
    key: string
  ): Promise<IReservationModel> {
    const cursor = await db.query(aql`
      FOR doc IN ${collection}
        FILTER doc.selected.key == ${key}
        RETURN doc
    `)

    return cursor.all()
  }
  /**
   * Update reservation document.
   */
  static async updateReservation(key: string, data: any) {
    return collection.update(key, data, {
      mergeObjects: false
    })
  }

  static async updateEmailedByMultiID(multiID: string) {
    db.query(aql`
      FOR doc IN ${collection}
        FILTER doc.multiID == ${multiID}
        UPDATE {_key: doc._key, conf_email_sent: true} IN ${collection}
    `)
  }

  static async updateRemindedByMultiID(multiID: string) {
    db.query(aql`
      FOR doc IN ${collection}
        FILTER doc.multiID == ${multiID}
        UPDATE {_key: doc._key, reminder_email_sent: true} IN ${collection}
    `)
  }

  static async updateNotifiedByMultiID(multiID: string) {
    db.query(aql`
      FOR doc IN ${collection}
        FILTER doc.multiID == ${multiID}
        UPDATE {_key: doc._key, notify_email_sent: true} IN ${collection}
    `)
  }

  static async removeReservation(key: string) {
    return collection
      .remove(key)
      .then(
        () => console.log('Document removed'),
        err => console.error('Failed to remove document', err)
      )
  }
}
