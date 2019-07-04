// Copyright (C) 2019 Digitalents Helsinki

import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'
import ShoreModel from '../model/shore'
const collection = db.collection('cleaninfos')
const { validationResult } = require('express-validator/check')
import { sendMail } from '../../mail'
import CleanInfoModel from '../model/cleaninfo'
import moment from 'moment'

export const saveCleanInfo: RequestHandler = async (req, res, next) => {
  let shore = null
  try {
    const data = req.body

    //check if this piece of shore is actually available
    shore = await ShoreModel.getShore(data.selected.key)
    if (
      shore.status &&
      shore.status !== 'free' &&
      shore.status !== 'reserved'
    ) {
      //409: Conflict (should this be used?)
      console.log('Shore unavailable')
      return res.status(409).send({ error: 'err_shoreunavailable' })
    }

    data.userip = req.connection.remoteAddress

    console.log(data)

    //check if datetimes are valid (i.e date is in the past)
    const datestring = data.date + 'T00:00:00'
    const date = new Date(datestring)
    const now = new Date()
    if (date > now) {
      return res.status(422).send({ error: 'err_validationerror' })
    }

    const errors = validationResult(req)
    if (!errors.isEmpty() || data.confirmed !== false) {
      console.log(errors.array())
      return res.status(422).send({ error: 'err_validationerror' })
    }

    //add timestamp
    data.timestamp = new Date().toISOString()

    //not archived yet
    data.archived = false

    //confirmation email not sent yet
    //obsolete for now
    //data.conf_email_sent = false

    //notify email not sent yet
    data.notify_email_sent = false

    collection.save(data).then(
      async meta => {
        console.log('Document saved, key:', meta._key)
        await sendEmail(meta._key, data.multiID)
      },
      err => console.error('Failed to save document:', err)
    )

    const { _key } = await ShoreModel.updateShoreDocument(
      req.body.selected.key,
      { status: 'cleaned' }
    )
  } catch (err) {
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
  const clean = await CleanInfoModel.getCleanedByKey(key)

  if (!clean.notify_email_sent && !notified_multiIDs.includes(multiid)) {
    notified_multiIDs.push(multiid)
    CleanInfoModel.updateNotifiedByMultiID(clean.multiID)
    sendMail(
      process.env.ADMIN_EMAIL,
      'Satakolkyt Uusi siivous',
      `
      <h4>Uusi siivousilmoitus vastaanotettu!</h4>
      <ul>
        <li>Siivonnut: ${clean.organizer_name}</li>
        <li>Päivämäärä: ${moment(clean.date).format('DD.MM.YYYY')}</li>
      </ul>
    `
    )
  } else {
    CleanInfoModel.updateNotifiedByMultiID(clean.multiID)
  }
}
