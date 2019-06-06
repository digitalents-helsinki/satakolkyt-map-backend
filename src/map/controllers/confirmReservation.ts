// Copyright (C) 2019 Digitalents Helsinki

import ShoreModel from '../model/shore'
import ReservationModel from '../model/reservation'

import { aql } from 'arangojs'
import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'

import { sendMail } from '../../mail'

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

    const reserv = await ReservationModel.getReservation(req.body.reservation)

    if (!reserv.conf_email_sent) {
      sendMail(reserv.email, 'test', 'reservation confirmed')
      ReservationModel.updateEmailedByMultiID(reserv.multiID)
    }
  } catch (err) {
    res.send({ error: err.message })
  }
}
