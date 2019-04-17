import { aql } from 'arangojs'
import { db } from '@/config/arangodb'

const collection = db.collection('geojson_features')

interface IShoreModelProperties {
  'gml:id'?: string
  'hel:id'?: number
  'hel:vastuu_org'?: string
  'hel:selite'?: string
  'hel:muokattu'?: string
  'hel:html_color'?: string
  'hel:paivitetty_tietopalveluun'?: string
  'dt:lastcleaned': number
}

interface IShoreModel {
  type: 'Feature'
  state?: {
    status: 'reserved' | 'cleaned' | undefined
  }
  properties: IShoreModelProperties
  geometry: GeoJSON.LineString
}

export default class ShoreModel {
  /**
   * Gets all shores that does not equal to 'reserved' in state.
   */
  static async getFreeShores(): Promise<IShoreModel[]> {
    const cursor = await db.query(aql`
      FOR doc IN ${collection}
        FILTER doc.state.status != 'reserved'
        FILTER doc.state.status != 'hidden'
        FILTER doc.state.status != 'cleaned'

        RETURN doc
    `)

    return cursor.all()
  }

  /**
   * Gets all shores that DOES equal to 'reserved' in state
   */
  static async getReservedShores(): Promise<IShoreModel[]> {
    const cursor = await db.query(aql`
      FOR doc IN ${collection}
        FILTER doc.state.status == 'reserved'
        RETURN doc
    `)

    return cursor.all()
  }

  /**
   * Gets all shores that DOES equal to 'cleaned' in state
   */
  static async getCleanedShores(): Promise<IShoreModel[]> {
    const cursor = await db.query(aql`
      FOR doc IN ${collection}
        FILTER doc.state.status == 'cleaned'
        return doc
    `)

    return cursor.all()
  }

  /**
   * Gets one shore doc by its key.
   */
  static async getShore(key: string): Promise<IShoreModel> {
    return collection.document(key)
  }

  /**
   * Update shore document.
   */
  static async updateShoreDocument(key: string, data: any) {
    return collection.update(key, data, {
      mergeObjects: false
    })
  }
}
