// Copyright (C) 2019 Digitalents Helsinki

import ReservationModel from '../model/reservation'
import { RequestHandler } from 'express'

export const getPublicReservedInfoByShoreKey: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const reserv = (await ReservationModel.getReservationByShoreKey(
      req.params.key
    ))[0]
    //sanitize private info:
    reserv.name = null
    reserv.email = null
    reserv.phonenumber = null
    reserv.userip = null

    //if not confirmed, don't send any real info
    const data = reserv.confirmed
      ? reserv
      : {
          _key: reserv._key,
          confirmed: false,
          selected: { key: reserv.selected.key }
        }

    res.send({ data: data })
  } catch (err) {
    res.send({ error: err.message })
  }
}
