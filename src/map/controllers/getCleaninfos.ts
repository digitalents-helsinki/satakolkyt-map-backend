import CleanInfoModel from '../model/cleaninfo'
import { RequestHandler } from 'express'

export const getCleanInfos: RequestHandler = async (req, res, next) => {
  try {
    res.send({ data: await CleanInfoModel.getCleanInfos() })
  } catch (err) {
    res.send({ error: err.message })
  }
}