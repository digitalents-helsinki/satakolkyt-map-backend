import ShoreModel from '../model/shore'
import { RequestHandler } from 'express'

export const cleanShore: RequestHandler = async (req, res, next) => {
  try {
    const { _key } = await ShoreModel.updateShoreDocument(req.body.key, {
      state: { status: 'cleaned', data: 'x', foo: 'bar' }
    })

    res.send({ json: await ShoreModel.getShore(_key) })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
