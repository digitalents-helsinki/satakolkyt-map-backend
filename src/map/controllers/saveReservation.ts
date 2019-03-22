import { aql } from 'arangojs'
import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'

/**
 * Returns all geosjon feature objects from the db collection.
 */
export const saveReservation: RequestHandler = async (req, res, next) => {
  try {
    const geojsonFeaturesCollection = db.collection('geojson_features')
    console.log(req.body.key)
    //const document = await geojsonFeaturesCollection.updatByExample()
    console.log('request send')
    const document = await geojsonFeaturesCollection.update(req.body.key, {state:{status:'reserved',data:'x'}})
    //res.send({ reserved: document,free: })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
