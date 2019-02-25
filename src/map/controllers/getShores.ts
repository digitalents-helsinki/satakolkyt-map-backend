import { RequestHandler } from 'express'

export const getShores: RequestHandler = async (req, res, next) => {
  try {
    res.send({ data: 'data' })
  } catch (err) {
    res.send({ error: err.message })
  }
}
