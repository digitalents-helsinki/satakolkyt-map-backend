// Copyright (C) 2019 Digitalents Helsinki

import { RequestHandler } from 'express'

/* eslint-disable  */
export const csrfToken: RequestHandler = async (req, res, next) => {
  try {
    //something wrong with lint
    res.send({ token: req['csrfToken']() }) //typescript made me do it
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
/* eslint-enable no-alert */
