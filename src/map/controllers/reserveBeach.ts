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

    //check if this piece of shore is actually available
    const shore = await ShoreModel.getShore(data.selected.key)
    if (shore.status && shore.status !== 'free') {
      //409: Conflict (should this be used?)
      console.log('Shore unavailable')
      return res.status(409).send({ error: 'err_shoreunavailable' })
    }

    //add the requesting user's ip to the data
    data.userip = req.connection.remoteAddress

    console.log(data)

    //check data format validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors.array())
      //422: Unprocessable Entity
      return res.status(422).send({ error: 'err_validationerror' })
    }

    //everything ok, save reservation to db
    collection
      .save(data)
      .then(
        meta => console.log('Document saved:', meta._rev),
        err => console.error('Failed to save document:', err)
      )
    //and set the shore status to reserved
    const { _key } = await ShoreModel.updateShoreDocument(
      req.body.selected.key,
      { status: 'reserved' }
    )

    res.send({ json: shore, status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
