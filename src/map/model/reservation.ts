import { aql } from 'arangojs'
import { db } from '@/config/arangodb'

const collection = db.collection('reservations')

interface IReservationModel {
  _key?: string
  _id?: string
  _rev?: string
  confirmed?: boolean
  organizer?: string
  startdate?: string
  starttime?: string
  //enddate?: string
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
  static async removeReservation(key: string) {
    return collection
      .remove(key)
      .then(
        () => console.log('Document removed'),
        err => console.error('Failed to remove document', err)
      )
  }
}
