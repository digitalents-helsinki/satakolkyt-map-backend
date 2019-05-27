// Copyright (C) 2019 Digitalents Helsinki

import StepsKmModel from '../model/steps_km_info'
import { RequestHandler } from 'express'

export const getStepsKm: RequestHandler = async (req, res, next) => {
  try {
    const stepskm = await StepsKmModel.getStepsKmInfo()
    res.send({ steps: stepskm.steps, km: parseFloat(stepskm.km.toFixed(1)) })
  } catch (err) {
    res.send({ error: err.message })
  }
}
