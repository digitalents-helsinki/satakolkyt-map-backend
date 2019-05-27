// Copyright (C) 2019 Digitalents Helsinki

import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'
import ShoreModel from '../model/shore'
const collection = db.collection('cleaninfos')
const { validationResult } = require('express-validator/check')

export const saveCleanInfo: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body

    //check if this piece of shore is actually available
    const shore = await ShoreModel.getShore(data.selected.key)
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

    collection
      .save(data)
      .then(
        meta => console.log('Document saved:', meta._rev),
        err => console.error('Failed to save document:', err)
      )

    const { _key } = await ShoreModel.updateShoreDocument(
      req.body.selected.key,
      { status: 'cleaned' }
    )

    res.send({ json: shore, status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
