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
  enddate?: string
  endtime?: string
  openevent?: boolean
  name?: string
  phonenumbery?: string
  email?: string
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
  /**
   * Update reservation document.
   */
  static async updateReservation(key: string, data: any) {
    return collection.update(key, data, {
      mergeObjects: false
    })
  }
  static async removeReservation(key: string) {
    return
    collection
      .remove(key)
      .then(
        () => console.log('Document removed'),
        err => console.error('Failed to remove document', err)
      )
  }
}
