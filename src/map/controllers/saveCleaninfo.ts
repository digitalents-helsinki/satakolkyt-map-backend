import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'
const collection = db.collection('cleaninfos')
const { validationResult } = require('express-validator/check')

export const saveCleanInfo: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      //return res.status(422).json({ errors: errors.array() })
    } else {
      console.log('saveCleaninfo: No validation errors!')
    }
    collection
      .save(req.body)
      .then(
        meta => console.log('Document saved:', meta._rev),
        err => console.error('Failed to save document:', err)
      )
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
