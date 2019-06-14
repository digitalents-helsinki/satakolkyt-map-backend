// Copyright (C) 2019 Digitalents Helsinki

import ShoreModel from '../model/shore'
import { aql } from 'arangojs'
import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'
const { validationResult } = require('express-validator/check')
const collection = db.collection('reservations')
import { sendMail } from '../../mail'
import ReservationModel from '../model/reservation'

/**
 * Returns all geosjon feature objects from the db collection.
 */
export const reserveBeach: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body

    //check if this piece of shore is actually available
    const shore = await ShoreModel.getShore(data.selected.key)
    if (shore.status && shore.status !== 'free') {
      //409: Conflict (should this be used?)
      console.log('Shore unavailable')
      return res.status(409).send({ error: 'err_shoreunavailable' })
    }

    //add the requesting user's ip to the data
    data.userip = req.connection.remoteAddress

    //check if datetimes are valid (i.e start in future and before end)
    const startstring = data.startdate + 'T' + data.starttime + ':00'
    const start = new Date(startstring)
    const now = new Date()
    const endstring = data.startdate + 'T' + data.endtime + ':00'
    const end = new Date(endstring)
    if (end < start || start < now) {
      return res.status(422).send({ error: 'err_validationerror' })
    }

    //check data format validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty() || data.confirmed !== false) {
      console.log(errors.array())
      //422: Unprocessable Entity
      return res.status(422).send({ error: 'err_validationerror' })
    }

    //add timestamp
    data.timestamp = new Date().toISOString()

    //confirmation email not yet sent
    data.conf_email_sent = false

    //reminder email not yet sent
    data.reminder_email_sent = false

    //notifier email not yet sent
    data.notify_email_sent = false

    //everything ok, save reservation to db
    collection.save(data).then(
      meta => {
        console.log('Document saved:', meta._rev)
        sendEmail(meta._key)
      },
      err => console.error('Failed to save document:', err)
    )
    //and set the shore status to reserved
    const { _key } = await ShoreModel.updateShoreDocument(
      req.body.selected.key,
      { status: 'reserved', hasReservation: true }
    )

    res.send({ json: shore, status: 'ok' })
    res.end()
  } catch (err) {
    console.log(err.message)
    // res.send({ error: err.message })
  }
}

const sendEmail = async key => {
  const reserv = await ReservationModel.getReservation(key)

  if (!reserv.notify_email_sent) {
    ReservationModel.updateNotifiedByMultiID(reserv.multiID)
    sendMail(process.env.ADMIN_EMAIL, 'Satakolkyt', 'Uusi varaus')
  }
}
