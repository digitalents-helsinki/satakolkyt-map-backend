// Copyright (C) 2019 Digitalents Helsinki

import jwt from 'jsonwebtoken'
import { config } from './config/jwt'
import { RequestHandler } from 'express'

export const login: RequestHandler = async (req, res, next) => {
  let username = req.body.username
  let password = req.body.password

  if (username && password) {
    if (
      username === process.env.FRONT_USER &&
      password === process.env.FRONT_PASS
    ) {
      let token = jwt.sign({ username: username }, config.secret, {
        expiresIn: '24h'
      })
      res.json({
        success: true,
        message: 'Authentication successful!',
        token: token
      })
    } else {
      res.json({
        success: false,
        message: 'Incorrect username or password'
      })
    }
  } else {
    res.json({
      success: false,
      message: 'Authentication failed! Please check the request'
    })
  }
}
