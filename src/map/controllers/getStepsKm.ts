import StepsKmModel from '../model/steps_km_info'
import { RequestHandler } from 'express'

export const getStepsKm: RequestHandler = async (req, res, next) => {
  try {
    res.send({ data: await StepsKmModel.getStepsKmInfo() })
  } catch (err) {
    res.send({ error: err.message })
  }
}
