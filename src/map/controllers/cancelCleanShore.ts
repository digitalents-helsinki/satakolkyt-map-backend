import CleanInfoModel from '../model/cleaninfo'
import ShoreModel from '../model/shore'
import { RequestHandler } from 'express'

export const cancelCleanShore: RequestHandler = async (req, res, next) => {
  try {
    const { reservation } = await CleanInfoModel.updateCleaned(req.body.clean, {
      confirmed: false
    })

    res.send({ status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
