// Copyright (C) 2019 Digitalents Helsinki

import { aql } from 'arangojs'
import { db } from '@/config/arangodb'

const collection = db.collection('steps_km_info')

interface IStepsKmModel {
  _key?: string
  _id?: string
  _rev?: string
  steps?: number
  km?: number
}

export default class StepsKmModel {
  static async getStepsKmInfo(): Promise<IStepsKmModel> {
    return collection.firstExample({ steps: Number, km: Number })
  }

  static async updateStepsKmInfo(newsteps, newkm) {
    collection.update(
      await this.getStepsKmInfo(),
      { steps: newsteps, km: newkm },
      { mergeObjects: false }
    )
  }
}
