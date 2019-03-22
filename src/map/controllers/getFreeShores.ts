import ShoreModel from '../model/shore'
import { RequestHandler } from 'express'

/**
 * Returns all geosjon feature objects from the db collection.
 */
export const getFreeShores: RequestHandler = async (req, res, next) => {
  try {
    res.send({ data: await ShoreModel.getFreeShores() })
  } catch (err) {
    res.send({ error: err.message })
  }
}
