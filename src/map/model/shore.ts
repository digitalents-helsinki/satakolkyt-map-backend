// Copyright (C) 2019 Digitalents Helsinki

import { aql } from 'arangojs'
import { db } from '@/config/arangodb'

const collection = db.collection('geojson_features')

interface IShoreModelProperties {
  id?: number
  length?: number
}

interface IShoreModel {
  type: 'Feature'
  status?: string
  hasReservation?: boolean
  properties: IShoreModelProperties
  geometry: GeoJSON.LineString
}

export default class ShoreModel {
  /**
   * Gets all shores that does not equal to 'reserved' in status.
   */
  static async getFreeShores(): Promise<IShoreModel[]> {
    const cursor = await db.query(aql`
      FOR doc IN ${collection}
        FILTER doc.status != 'reserved'
        FILTER doc.status != 'hidden'
        FILTER doc.status != 'cleaned'

        RETURN doc
    `)

    return cursor.all()
  }

  /**
   * Gets all shores that DOES equal to 'reserved' in status
   */
  static async getReservedShores(): Promise<IShoreModel[]> {
    const cursor = await db.query(aql`
      FOR doc IN ${collection}
        FILTER doc.status == 'reserved'
        RETURN doc
    `)

    return cursor.all()
  }
  static async getHiddenShores(): Promise<IShoreModel[]> {
    const cursor = await db.query(aql`
      FOR doc IN ${collection}
        FILTER doc.status == 'hidden'
        RETURN doc
    `)

    return cursor.all()
  }

  /**
   * Gets all shores that DOES equal to 'cleaned' in status
   */
  static async getCleanedShores(): Promise<IShoreModel[]> {
    const cursor = await db.query(aql`
      FOR doc IN ${collection}
        FILTER doc.status == 'cleaned'
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
