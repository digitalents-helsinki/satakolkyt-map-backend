import { Router } from 'express'

import { login }  from '../login'
import { checkToken } from '../jwt'

import { getFreeShores } from './controllers/getFreeShores'
import { getReservedShores } from './controllers/getReservedShores'
import { getCleanedShores } from './controllers/getCleanedShores'
import { getReservations } from './controllers/getReservations'
import { getCleanInfos } from './controllers/getCleaninfos'
import { getShore } from './controllers/getShore'

import { saveReservation } from './controllers/saveReservation'
import { hideShore } from './controllers/hideShore'
import { cleanShore } from './controllers/cleanShore'

import { reserveBeach } from './controllers/reserveBeach'
import { saveCleanInfo } from './controllers/saveCleaninfo'

export const router = Router()

router.get('/shores', getFreeShores)
router.get('/shore/:key', getShore)
router.get('/shores/reserved', getReservedShores)
router.get('/shores/cleaned', getCleanedShores)

router.get('/reservations/', getReservations)
router.get('/cleaninfos/', getCleanInfos)

router.post('/delete/:key', hideShore)
router.post('/reserve/', reserveBeach)
router.post('/cleanbeach', saveReservation)
router.post('/clean/', cleanShore)
router.post('/cleaninfo', saveCleanInfo)

router.post('/login', login)