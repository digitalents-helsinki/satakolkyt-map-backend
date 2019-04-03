import { aql } from 'arangojs'
import { db } from '@/config/arangodb'

const collection = db.collection('reservations')

interface IReservationModel {
  '_key' ?: string
  '_id' ?: string
  '_rev' ?: string
  'startdate' ?: string
  'starttime' ?: string
  'enddate' ?: string
  'endtime' ?: string
  'type' ?: string
  'organizer' ?: string
  'name' ?: string
  'phonenumbery' ?: string
  'email' ?: string
}

export default class ReservationModel {
  static async getReservations(): Promise<IReservationModel[]> {
    const cursor = await db.query(aql`
      FOR doc IN ${collection}
        RETURN doc
    `)

    return cursor.all()
  }
}