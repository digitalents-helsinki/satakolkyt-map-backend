// Copyright (C) 2019 Digitalents Helsinki

import ShoreModel from '../model/shore'
import { aql } from 'arangojs'
import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'
const { validationResult } = require('express-validator/check')
const collection = db.collection('reservations')
import { sendMail } from '../../mail'
import ReservationModel from '../model/reservation'
import moment from 'moment'

export const reserveBeach: RequestHandler = async (req, res, next) => {
  let shore = null
  try {
    const data = req.body

    //check if this piece of shore is actually available
    shore = await ShoreModel.getShore(data.selected.key)
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
      async meta => {
        console.log('Document saved, key:', meta._key)
        await sendEmail(meta._key, data.multiID)
      },
      err => console.error('Failed to save document:', err)
    )
    //and set the shore status to reserved
    const { _key } = await ShoreModel.updateShoreDocument(
      req.body.selected.key,
      { status: 'reserved', hasReservation: true }
    )
  } catch (err) {
    console.log(err.message)
    res.send({ error: err.message })
    res.end()
    return
  }
  res.send({ json: shore, status: 'ok' })
  res.end()
}

//temp cache to get around db updates being async and slow
const notified_multiIDs = []

const sendEmail = async (key, multiid) => {
  const reserv = await ReservationModel.getReservation(key)

  if (!reserv.notify_email_sent && !notified_multiIDs.includes(multiid)) {
    notified_multiIDs.push(multiid)
    ReservationModel.updateNotifiedByMultiID(reserv.multiID)
    sendMail(
      process.env.ADMIN_EMAIL,
      'SATAKOLKYT Uusi varaus',
      `
      <h4>Uusi rantavaraus vastaanotettu!</h4>
      <ul>
        <li>Varaaja: ${reserv.organizer}</li>
        <li>Päivämäärä: ${moment(reserv.startdate).format('DD.MM.YYYY')} klo ${
        reserv.starttime
      } - ${reserv.endtime}</li>
        <li>Rantaa varattu: n. ${Math.round(reserv.multiLength)} metriä </li>
      </ul>
    `
    )
  }
}
