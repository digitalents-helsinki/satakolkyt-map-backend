// Copyright (C) 2019 Digitalents Helsinki

import ShoreModel from '../model/shore'
import CleanInfoModel, { ICleanInfoModel } from '../model/cleaninfo'
import StepsKmModel from '../model/steps_km_info'
import { RequestHandler } from 'express'
import { sendMail } from '../../mail'
import { generateTitle, composeMessage } from '../../messages/composeMessage'

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

    sendEmail(cleaninfo)
  } catch (err) {
    res.send({ error: err.message })
  }
}

const emailed_multiIDs = []

const sendEmail = (cleaninfo: ICleanInfoModel) => {
  if (
    !cleaninfo.conf_email_sent &&
    !emailed_multiIDs.includes(cleaninfo.multiID)
  ) {
    emailed_multiIDs.push(cleaninfo.multiID)
    CleanInfoModel.updateEmailedByMultiID(cleaninfo.multiID)
    sendMail(
      cleaninfo.leader_email,
      generateTitle('confirmation', cleaninfo.language || 'fi'),
      composeMessage('confirmation', cleaninfo.language || 'fi'),
      { attachments: true }
    )
  } else {
    CleanInfoModel.updateEmailedByMultiID(cleaninfo.multiID)
  }
}
