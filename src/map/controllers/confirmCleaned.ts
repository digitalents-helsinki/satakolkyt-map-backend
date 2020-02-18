// Copyright (C) 2019 Digitalents Helsinki

import ShoreModel from '../model/shore'
import CleanInfoModel from '../model/cleaninfo'
import StepsKmModel from '../model/steps_km_info'
import { RequestHandler } from 'express'
import { sendMail } from '../../mail'
import { cleanConfirmation } from '../../messages/cleanConfirmation'

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

    if (!cleaninfo.conf_email_sent) {
      await CleanInfoModel.updateEmailedByMultiID(cleaninfo.multiID)
      sendMail(
        cleaninfo.leader_email,
        'Kiitos, kun osallistuitte SATAKOLKYT-talkoisiin!',
        cleanConfirmation,
        { attachments: true }
      )
    }
  } catch (err) {
    res.send({ error: err.message })
  }
}
