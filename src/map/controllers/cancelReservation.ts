// Copyright (C) 2019 Digitalents Helsinki

import ReservationModel from '../model/reservation'
import ShoreModel from '../model/shore'
import { RequestHandler } from 'express'

export const cancelReservation: RequestHandler = async (req, res, next) => {
  try {
    const { reservation } = await ReservationModel.updateReservation(
      req.body.reservation,
      {
        confirmed: false
      }
    )

    res.send({ status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
