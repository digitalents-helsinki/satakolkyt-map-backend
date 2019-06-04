// Copyright (C) 2019 Digitalents Helsinki

import ShoreModel from '../model/shore'
import CleanInfoModel from '../model/cleaninfo'
import StepsKmModel from '../model/steps_km_info'
import { RequestHandler } from 'express'
import { sendMail } from '../../mail'

export const confirmCleaned: RequestHandler = async (req, res, next) => {
  try {
    const cleaninfo = await CleanInfoModel.getCleanedByKey(req.body.clean)
    const { clean } = await CleanInfoModel.updateCleaned(req.body.clean, {
      confirmed: true,
      leader_name: '---',
      leader_email: '---',
      leader_phone: '---'
    })

    const shoreinfo = await ShoreModel.getShore(req.body.key)
    const stepskm = await StepsKmModel.getStepsKmInfo()
    const newsteps =
      stepskm.steps +
      Math.floor(cleaninfo.group_size * (shoreinfo.properties.length / 0.6))
    const newkm = stepskm.km + shoreinfo.properties.length / 1000
    StepsKmModel.updateStepsKmInfo(newsteps, newkm)

    res.send({ status: 'ok' })
    res.end()

    sendMail(
      cleaninfo.leader_email,
      'Siivouksenne on vahvistettu',
      'Siivouksenne on nyt vahvistettu. SATAKOLKYT kiittää! Henkilötietonne on poistettu järjestelmästä.'
    )
  } catch (err) {
    res.send({ error: err.message })
  }
}
