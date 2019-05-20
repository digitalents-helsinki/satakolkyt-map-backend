import ShoreModel from '../model/shore'
import CleanInfoModel from '../model/cleaninfo'
import StepsKmModel from '../model/steps_km_info'
import { RequestHandler } from 'express'

export const confirmCleaned: RequestHandler = async (req, res, next) => {
  try {
    const { clean } = await CleanInfoModel.updateCleaned(req.body.clean, {
      confirmed: true
    })

    //test for now:
    StepsKmModel.updateStepsKmInfo(888, 999)

    res.send({ status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
