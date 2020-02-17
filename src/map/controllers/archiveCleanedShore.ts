// Copyright (C) 2019 Digitalents Helsinki

import ShoreModel from '../model/shore'
import CleanInfoModel from '../model/cleaninfo'
import { RequestHandler } from 'express'

export const archiveCleanedShore: RequestHandler = async (req, res, next) => {
  try {
    const clean = await CleanInfoModel.getCleanedByKey(req.body.key)

    if (clean.confirmed) {
      const shore = await archiveCleaninfo(clean)
      res.send({ shore, status: 'ok' })
    } else {
      res.send({ error: 'Shore is not clean' })
    }
  } catch (err) {
    res.send({ error: err.message })
  }
}

async function archiveCleaninfo(clean) {
  const shore = await ShoreModel.getShore(clean.selected.key)

  const { _key } = await ShoreModel.updateShoreDocument(clean.selected.key, {
    status: shore.hasReservation ? 'reserved' : 'free'
  })

  console.log('Archiving cleaned shore ' + clean._key)
  await CleanInfoModel.updateCleaned(clean._key, { archived: true })
  return shore
}
