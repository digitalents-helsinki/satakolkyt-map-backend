// Copyright (C) 2019 Digitalents Helsinki

import ShoreModel from '../model/shore'
import { RequestHandler } from 'express'

/**
 * Returns all geosjon feature objects from the db collection.
 */
export const getReservedShores: RequestHandler = async (req, res, next) => {
  try {
    res.send({ data: await ShoreModel.getReservedShores() })
  } catch (err) {
    res.send({ error: err.message })
  }
}
