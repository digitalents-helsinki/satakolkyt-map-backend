import CleanInfoModel from '../model/cleaninfo'
import { RequestHandler } from 'express'

export const getPublicCleanedInfoByShoreKey: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const cleaned = (await CleanInfoModel.getCleanedByShoreKey(
      req.params.key
    ))[0]
    //sanitize private info
    cleaned.leader_name = null
    cleaned.leader_email = null
    cleaned.leader_phone = null
    cleaned.userip = null
    res.send({ data: cleaned })
  } catch (err) {
    res.send({ error: err.message })
  }
}
