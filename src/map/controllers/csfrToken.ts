import { RequestHandler } from 'express'
/* eslint-disable  */
export const csfrToken: RequestHandler = async (req, res, next) => {
  try {
    //something wrong with lint
    console.log(req)
    res.send({ token: req.cookies._csrf })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
/* eslint-enable no-alert */
