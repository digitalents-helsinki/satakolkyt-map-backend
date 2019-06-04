// Copyright (C) 2019 Digitalents Helsinki

import ShoreModel from '../model/shore'
import CleanInfoModel from '../model/cleaninfo'
import StepsKmModel from '../model/steps_km_info'

import { aql } from 'arangojs'
import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'

export const archiveOldCleanShores: RequestHandler = async (req, res, next) => {
  try {
    console.log('Archiving old confirmed cleanings...')
    const cleans = await CleanInfoModel.getCleanInfos()
    let shores = []
    for (let c of cleans) {
      if (c.confirmed && isOld(c.date)) {
        shores.push(await archiveCleaninfo(c))
      }
    }

    res.send({ shores: shores, status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}

async function archiveCleaninfo(clean) {
  const shore = await ShoreModel.getShore(clean.selected.key)

  const { _key } = await ShoreModel.updateShoreDocument(clean.selected.key, {
    status: shore.hasReservation ? 'reserved' : 'free'
  })

  // Shouldn't be undoing counter steps/km after all
  /*if (clean.confirmed) {
    const stepskm = await StepsKmModel.getStepsKmInfo()
    const newsteps =
      stepskm.steps -
      Math.floor(clean.group_size * (shore.properties.length / 0.6))
    const newkm = stepskm.km - shore.properties.length / 1000
    StepsKmModel.updateStepsKmInfo(newsteps, newkm)
  }*/

  console.log('Archiving cleaned shore ' + clean._key)
  await CleanInfoModel.updateCleaned(clean._key, { archived: true })
  return shore
}

function isOld(date: string): Boolean {
  const cleaned = new Date(date + 'T00:00:00')
  const twomonthsago = new Date()
  twomonthsago.setMonth(twomonthsago.getMonth() - 2)
  return cleaned < twomonthsago
}
