import ShoreModel from '../model/shore'
import CleanInfoModel from '../model/cleaninfo'
import { RequestHandler } from 'express'

/**
 * Returns all geosjon feature objects from the db collection.
 */
export const deleteCleanedShore: RequestHandler = async (req, res, next) => {
  try {
    const { _key } = await ShoreModel.updateShoreDocument(req.body.key, {
      status: 'free'
    })
    console.log('Removing cleaned shore ' + req.body.id)
    await CleanInfoModel.removeCleaned(req.body.id)

    res.send({ json: await ShoreModel.getShore(_key), status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
