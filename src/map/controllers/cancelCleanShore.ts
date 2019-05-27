// Copyright (C) 2019 Digitalents Helsinki

import CleanInfoModel from '../model/cleaninfo'
import ShoreModel from '../model/shore'
import StepsKmModel from '../model/steps_km_info'
import { RequestHandler } from 'express'

export const cancelCleanShore: RequestHandler = async (req, res, next) => {
  try {
    const { reservation } = await CleanInfoModel.updateCleaned(req.body.clean, {
      confirmed: false
    })

    const cleaninfo = await CleanInfoModel.getCleanedByKey(req.body.clean)
    const shoreinfo = await ShoreModel.getShore(req.body.key)
    const stepskm = await StepsKmModel.getStepsKmInfo()
    const newsteps =
      stepskm.steps -
      Math.floor(cleaninfo.group_size * (shoreinfo.properties.length / 0.6))
    const newkm = stepskm.km - shoreinfo.properties.length / 1000
    StepsKmModel.updateStepsKmInfo(newsteps, newkm)

    res.send({ status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
