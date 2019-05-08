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
    res.send({ data: reserv })
  } catch (err) {
    res.send({ error: err.message })
  }
}
