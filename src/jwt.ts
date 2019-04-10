import jwt from 'jsonwebtoken'
import { config } from './config/jwt'

export let checkToken = (req, res, next) => {
  let token = req.headers['authorization']
  if (typeof token !== undefined) {
    jwt.verify(token, config.secret , (err: Boolean) => {
      if (err) {
        return res.sendStatus(403)
      } else {
        next()
      }
    })
  } else {
    res.sendStatus(403)
  }
}