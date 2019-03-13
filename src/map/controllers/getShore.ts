import { aql } from 'arangojs'
import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'

/**
 * Returns all geosjon feature objects from the db collection.
 */
export const getShore: RequestHandler = async (req, res, next) => {
  try {
    const geojsonFeaturesCollection = db.collection('geojson_features')

    const document = await geojsonFeaturesCollection.document(req.params.key)

    res.send({ data: document })
  } catch (err) {
    res.send({ error: err.message })
  }
}
