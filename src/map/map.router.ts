import { Router } from 'express'
import { getFreeShores } from './controllers/getFreeShores'
import { getReservedShores } from './controllers/getReservedShores'

import { getShore } from './controllers/getShore'
import { saveReservation } from './controllers/saveReservation'
import { reserveBeach } from './controllers/reserveBeach'

import { hideShore } from './controllers/hideShore'

export const router = Router()

router.get('/shores', getFreeShores)
router.get('/shore/:key', getShore)
router.get('/shores/reserved', getReservedShores)
router.post('/delete/:key', hideShore)
router.post('/reserve/', reserveBeach)

router.post('/cleanbeach', saveReservation)
