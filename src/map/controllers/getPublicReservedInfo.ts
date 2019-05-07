import ReservationModel from '../model/reservation'
import { RequestHandler } from 'express'

export const getPublicReservedInfo: RequestHandler = async (req, res, next) => {
  try {
    const reserv = await ReservationModel.getReservation(req.params.key)
    //sanitize private info:
    reserv.name = null
    reserv.email = null
    reserv.phonenumber = null
    res.send({ data: reserv })
  } catch (err) {
    res.send({ error: err.message })
  }
}
