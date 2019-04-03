import ShoreModel from '../model/shore'
import { aql } from 'arangojs'
import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'

/**
 * Returns all geosjon feature objects from the db collection.
 */
export const hideShore: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.params)
const { _key } = await ShoreModel.updateShoreDocument(req.params.key, {
    state: { status: 'hidden', data: 'x', foo: 'bar' }
})

    res.send({ json: await ShoreModel.getShore(_key) })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
