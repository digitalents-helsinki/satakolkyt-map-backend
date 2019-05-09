import ShoreModel from '../model/shore'
import CleanInfoModel from '../model/cleaninfo'
import { RequestHandler } from 'express'

export const confirmCleaned: RequestHandler = async (req, res, next) => {
  try {
    const { clean } = await CleanInfoModel.updateCleaned(req.body.clean, {
      confirm: true
    })

    res.send({ status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
