// Copyright (C) 2019 Digitalents Helsinki

import ShoreModel from '../model/shore'
import ReservationModel from '../model/reservation'

import { aql } from 'arangojs'
import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'

import { sendMail } from '../../mail'

import { generateTitle, composeMessage } from '../../messages/composeMessage'

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

    await sendEmail(reserv)
  } catch (err) {
    res.send({ error: err.message })
  }
}

const emailed_multiIDs = []

const sendEmail = async reserv => {
  if (!reserv.conf_email_sent && !emailed_multiIDs.includes(reserv.multiID)) {
    emailed_multiIDs.push(reserv.multiID)
    ReservationModel.updateEmailedByMultiID(reserv.multiID)
    sendMail(
      reserv.email,
      generateTitle('reservation'),
      composeMessage('reservation'),
      { attachments: true }
    )
  } else {
    ReservationModel.updateEmailedByMultiID(reserv.multiID)
  }
}
