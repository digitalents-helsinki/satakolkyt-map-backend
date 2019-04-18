import CleanInfoModel from '../model/cleaninfo'
import ShoreModel from '../model/shore'
import { RequestHandler } from 'express'

export const removeCleanShore: RequestHandler = async (req, res, next) => {
  try {
    const { _key } = await ShoreModel.updateShoreDocument(req.body.key, {
        state: { status: 'free', data: 'x', foo: 'bar' }
    })
    const { reservation } = await CleanInfoModel.updateCleaned(req.body.clean, {
      confirm:false,
    })


    res.send({status: "ok"})
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
