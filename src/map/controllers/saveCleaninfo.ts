import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'
const collection = db.collection('cleaninfos')
const { validationResult } = require('express-validator/check')

export const saveCleanInfo: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body

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

    res.send({ status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
