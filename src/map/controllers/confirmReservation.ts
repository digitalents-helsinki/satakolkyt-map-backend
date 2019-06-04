// Copyright (C) 2019 Digitalents Helsinki

import ShoreModel from '../model/shore'
import ReservationModel from '../model/reservation'

import { aql } from 'arangojs'
import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'

/**
 * Returns all geosjon feature objects from the db collection.
 */
export const confirmReservation: RequestHandler = async (req, res, next) => {
  try {
    const { reservation } = await ReservationModel.updateReservation(
      req.body.reservation,
      {
        confirmed: true
      }
    )

    res.send({ status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
