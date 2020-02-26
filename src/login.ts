// Copyright (C) 2019 Digitalents Helsinki

import jwt from 'jsonwebtoken'
import { config } from './config/jwt'
import { RequestHandler } from 'express'
import timingSafeCompare from 'tsscmp'

export const login: RequestHandler = async (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  if (username && password) {
    const validUser = timingSafeCompare(process.env.FRONT_USER, username)
    const validPass = timingSafeCompare(process.env.FRONT_PASS, password)
    if (validUser && validPass) {
      const token = jwt.sign({ username: username }, config.secret, {
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
