// Copyright (C) 2019 Digitalents Helsinki

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

    //if not confirmed, don't send any real info
    const data = cleaned.confirmed
      ? cleaned
      : {
          _key: cleaned._key,
          confirmed: false,
          selected: { key: cleaned.selected.key }
        }
    res.send({ data: data })
  } catch (err) {
    res.send({ error: err.message })
  }
}
