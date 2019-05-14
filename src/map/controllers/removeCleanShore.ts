import CleanInfoModel from '../model/cleaninfo'
import ShoreModel from '../model/shore'
import { RequestHandler } from 'express'

export const removeCleanShore: RequestHandler = async (req, res, next) => {
  try {
    const { _key } = await ShoreModel.updateShoreDocument(req.body.key, {
      status: 'free'
    })
    const { reservation } = await CleanInfoModel.updateCleaned(req.body.clean, {
      confirmed: false
    })

    res.send({ status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
