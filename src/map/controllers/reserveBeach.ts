import ShoreModel from '../model/shore'
import { aql } from 'arangojs'
import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'
const { validationResult } = require('express-validator/check')
const collection = db.collection('reservations')

/**
 * Returns all geosjon feature objects from the db collection.
 */
export const reserveBeach: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body
    data.userip = req.connection.remoteAddress
    console.log(data)
    collection
      .save(data)
      .then(
        meta => console.log('Document saved:', meta._rev),
        err => console.error('Failed to save document:', err)
      )
    const validationOn = false // disable validation during dev
    const errors = validationResult(req)
    if (!errors.isEmpty() && validationOn) {
      return res.status(422).json({ errors: errors.array() })
    }
    //everything ok, set shore as reserved
    const { _key } = await ShoreModel.updateShoreDocument(
      req.body.selected.key,
      { status: 'reserved' }
    )

    res.send({ json: await ShoreModel.getShore(_key), status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
