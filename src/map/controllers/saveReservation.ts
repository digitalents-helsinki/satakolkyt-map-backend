import { aql } from 'arangojs'
import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'

/**
 * Returns all geosjon feature objects from the db collection.
 */
export const saveReservation: RequestHandler = async (req, res, next) => {
  try {
    const geojsonFeaturesCollection = db.collection('geojson_features')
    console.log(req.body)
    //const document = await geojsonFeaturesCollection.updatByExample()
    console.log('request send')
    //res.send({ data: document })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
