import ReservationModel from '../model/reservation'
import { RequestHandler } from 'express'

export const getReservations: RequestHandler = async (req, res, next) => {
  try {
    res.send({ data: await ReservationModel.getReservations() })
  } catch (err) {
    res.send({ error: err.message })
  }
}