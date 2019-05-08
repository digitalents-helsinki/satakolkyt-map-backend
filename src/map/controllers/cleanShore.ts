import ShoreModel from '../model/shore'
import CleanInfoModel from '../model/cleaninfo'
import { RequestHandler } from 'express'

export const cleanShore: RequestHandler = async (req, res, next) => {
  try {
    const { _key } = await ShoreModel.updateShoreDocument(req.body.key, {
      status: 'cleaned'
    })
    const { clean } = await CleanInfoModel.updateCleaned(req.body.clean, {
      confirm: true
    })

    res.send({ json: await ShoreModel.getShore(_key), status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
