// Copyright (C) 2019 Digitalents Helsinki

import ShoreModel from '../model/shore'
import CleanInfoModel from '../model/cleaninfo'
import StepsKmModel from '../model/steps_km_info'

import { aql } from 'arangojs'
import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'

export const deleteOldCleanShores: RequestHandler = async (req, res, next) => {
  try {
    console.log('Removing old reservations...')
    const cleans = await CleanInfoModel.getCleanInfos()
    let shores = []
    for (let c of cleans) {
      if (isOld(c.date)) {
        shores.push(await deleteCleaninfo(c))
      }
    }

    res.send({ shores: shores, status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}

async function deleteCleaninfo(clean) {
  const shore = await ShoreModel.getShore(clean.selected.key)

  const { _key } = await ShoreModel.updateShoreDocument(clean.selected.key, {
    status: shore.hasReservation ? 'reserved' : 'free'
  })

  if (clean.confirmed) {
    const stepskm = await StepsKmModel.getStepsKmInfo()
    const newsteps =
      stepskm.steps -
      Math.floor(clean.group_size * (shore.properties.length / 0.6))
    const newkm = stepskm.km - shore.properties.length / 1000
    StepsKmModel.updateStepsKmInfo(newsteps, newkm)
  }

  console.log('Removing cleaned shore ' + clean._key)
  await CleanInfoModel.removeCleaned(clean._key)
  return shore
}

function isOld(date: string): Boolean {
  const cleaned = new Date(date + 'T00:00:00')
  const twomonthsago = new Date()
  twomonthsago.setMonth(twomonthsago.getMonth() - 2)
  return cleaned < twomonthsago
}
