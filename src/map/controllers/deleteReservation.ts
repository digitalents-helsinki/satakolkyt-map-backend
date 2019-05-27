// Copyright (C) 2019 Digitalents Helsinki

import ShoreModel from '../model/shore'
import ReservationModel from '../model/reservation'

import { aql } from 'arangojs'
import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'

export const deleteReservation: RequestHandler = async (req, res, next) => {
  try {
    const shore = await ShoreModel.getShore(req.body.shorekey)
    const { _key } = await ShoreModel.updateShoreDocument(req.body.shorekey, {
      status: shore.status === 'cleaned' ? 'cleaned' : 'free',
      hasReservation: false
    })
    console.log('Removing reservation ' + req.body.reservkey)
    await ReservationModel.removeReservation(req.body.reservkey)

    res.send({ json: await ShoreModel.getShore(_key), status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}
