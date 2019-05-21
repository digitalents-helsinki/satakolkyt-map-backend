import ShoreModel from '../model/shore'
import CleanInfoModel from '../model/cleaninfo'
import StepsKmModel from '../model/steps_km_info'
import { RequestHandler } from 'express'

/**
 * Returns all geosjon feature objects from the db collection.
 */
export const deleteCleanedShore: RequestHandler = async (req, res, next) => {
  try {
    const shore = await ShoreModel.getShore(req.body.key)

    const { _key } = await ShoreModel.updateShoreDocument(req.body.key, {
      status: shore.hasReservation ? 'reserved' : 'free'
    })

    const cleaninfo = await CleanInfoModel.getCleanedByKey(req.body.id)
    if (cleaninfo.confirmed) {
      const stepskm = await StepsKmModel.getStepsKmInfo()
      const newsteps =
        stepskm.steps -
        Math.floor(cleaninfo.group_size * (shore.properties.length / 0.6))
      const newkm = stepskm.km - shore.properties.length / 1000
      StepsKmModel.updateStepsKmInfo(newsteps, newkm)
    }

    console.log('Removing cleaned shore ' + req.body.id)
    await CleanInfoModel.removeCleaned(req.body.id)

    res.send({ json: await ShoreModel.getShore(_key), status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
