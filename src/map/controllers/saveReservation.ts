import ShoreModel from '../model/shore'
import ReservationModel from '../model/reservation'

import { aql } from 'arangojs'
import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'

/**
 * Returns all geosjon feature objects from the db collection.
 */
export const saveReservation: RequestHandler = async (req, res, next) => {
  try {
    const { _key } = await ShoreModel.updateShoreDocument(req.body.key, {
      state: { status: 'reserved', data: 'x', foo: 'bar' }
    })
    const { reservation } = await ReservationModel.updateReservation(req.body.reservation, {
      confirm:true,
    })


    res.send({ json: await ShoreModel.getShore(_key) })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
