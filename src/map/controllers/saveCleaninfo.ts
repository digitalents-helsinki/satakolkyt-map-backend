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
    if (shore.status && shore.status !== 'free') {
      //reserved shores not cleanable for now
      //409: Conflict (should this be used?)
      console.log('Shore unavailable')
      return res.status(409).send({ error: 'err_shoreunavailable' })
    }

    data.userip = req.connection.remoteAddress

    console.log(data)

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.status(422).send({ error: 'err_validationerror' })
    }

    collection
      .save(data)
      .then(
        meta => console.log('Document saved:', meta._rev),
        err => console.error('Failed to save document:', err)
      )

    res.send({ json: shore, status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
