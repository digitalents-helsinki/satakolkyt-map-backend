import { Router } from 'express'
import { getFreeShores } from './controllers/getFreeShores'
import { getReservedShores } from './controllers/getReservedShores'

import { getShore } from './controllers/getShore'
import { saveReservation } from './controllers/saveReservation'

export const router = Router()

router.get('/shores', getFreeShores)
router.get('/shore/:key', getShore)
router.get('/shores/reserved', getReservedShores)

router.post('/cleanbeach', saveReservation)
