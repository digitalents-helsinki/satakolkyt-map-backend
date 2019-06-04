// Copyright (C) 2019 Digitalents Helsinki

import ShoreModel from '../model/shore'
import { RequestHandler } from 'express'

export const unhideBeach: RequestHandler = async (req, res, next) => {
  try {
    const { _key } = await ShoreModel.updateShoreDocument(req.body.key, {
      status: 'free'
    })

    res.send({ json: await ShoreModel.getShore(_key), status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
