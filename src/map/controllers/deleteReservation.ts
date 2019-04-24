import ShoreModel from '../model/shore'
import ReservationModel from '../model/reservation'

import { aql } from 'arangojs'
import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'

/**
 * Returns all geosjon feature objects from the db collection.
 */
export const deleteReservation: RequestHandler = async (req, res, next) => {
  try {
    const { _key } = await ShoreModel.updateShoreDocument(req.body.key, {
      state: { status: 'free', data: 'x', foo: 'bar' }
    })
    await ReservationModel.removeReservation(req.body.id)

    res.end('deleted')
  } catch (err) {
    res.send({ error: err.message })
  }
}
