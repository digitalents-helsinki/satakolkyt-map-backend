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
    console.log(req.body)
    collection.save(req.body).then(
      meta => console.log('Document saved:', meta._rev),
      err => console.error('Failed to save document:', err)
    );
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    collection
      .save(req.body)
      .then(
        meta => console.log('Document saved:', meta._rev),
        err => console.error('Failed to save document:', err)
      )
    res.send({ status: "ok" })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
