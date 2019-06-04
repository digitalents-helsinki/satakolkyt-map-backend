// Copyright (C) 2019 Digitalents Helsinki

import ShoreModel from '../model/shore'
import CleanInfoModel from '../model/cleaninfo'
import StepsKmModel from '../model/steps_km_info'
import { RequestHandler } from 'express'

export const confirmCleaned: RequestHandler = async (req, res, next) => {
  try {
    const { clean } = await CleanInfoModel.updateCleaned(req.body.clean, {
      confirmed: true,
      leader_name: '---',
      leader_email: '---',
      leader_phone: '---'
    })

    const cleaninfo = await CleanInfoModel.getCleanedByKey(req.body.clean)
    const shoreinfo = await ShoreModel.getShore(req.body.key)
    const stepskm = await StepsKmModel.getStepsKmInfo()
    const newsteps =
      stepskm.steps +
      Math.floor(cleaninfo.group_size * (shoreinfo.properties.length / 0.6))
    const newkm = stepskm.km + shoreinfo.properties.length / 1000
    StepsKmModel.updateStepsKmInfo(newsteps, newkm)

    res.send({ status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
