import { aql } from 'arangojs'
import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'

/**
 * Returns all geosjon feature objects from the db collection.
 */
export const getReservedShores: RequestHandler = async (req, res, next) => {
  try {
    const geojsonFeaturesCollection = db.collection('geojson_features')
const active = "reserved";
    const cursor = await db.query(aql`
      FOR doc IN ${geojsonFeaturesCollection}
  FILTER doc.state.status == ${active}
          RETURN doc
    `)

    res.send({ data: await cursor.all() })
  } catch (err) {
    res.send({ error: err.message })
  }
}
