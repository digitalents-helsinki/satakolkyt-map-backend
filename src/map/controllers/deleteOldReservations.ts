// Copyright (C) 2019 Digitalents Helsinki

import ShoreModel from '../model/shore'
import ReservationModel from '../model/reservation'

import { aql } from 'arangojs'
import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'

export const deleteOldReservations: RequestHandler = async (req, res, next) => {
  try {
    console.log('Removing old reservations...')
    const reservs = await ReservationModel.getReservations()
    let num = 0
    for (let r of reservs) {
      if (isOld(r.startdate, r.endtime)) {
        await deleteReservation(r)
        num++
      }
    }

    res.send({ removeCount: num, status: 'ok' })
    res.end()
  } catch (err) {
    res.send({ error: err.message })
  }
}

async function deleteReservation(reserv) {
  const shore = await ShoreModel.getShore(reserv.selected.key)
  const { _key } = await ShoreModel.updateShoreDocument(reserv.selected.key, {
    status: shore.status === 'cleaned' ? 'cleaned' : 'free',
    hasReservation: false
  })
  console.log('Removing reservation ' + reserv._key)
  await ReservationModel.removeReservation(reserv._key)
}

function isOld(date: string, time: string): Boolean {
  const reserv = new Date(date + 'T' + time + ':00')
  const now = new Date()
  return reserv < now
}
