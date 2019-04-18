import { Router } from 'express'

import { login } from '../login'
import { checkToken } from '../jwt'
const { check } = require('express-validator/check')
import { getFreeShores } from './controllers/getFreeShores'
import { getReservedShores } from './controllers/getReservedShores'
import { getCleanedShores } from './controllers/getCleanedShores'
import { getHiddenShores } from './controllers/getHiddenShores'

import { getReservations } from './controllers/getReservations'
import { getCleanInfos } from './controllers/getCleaninfos'
import { getShore } from './controllers/getShore'

import { saveReservation } from './controllers/saveReservation'
import { removeReservation } from './controllers/removeReservation'
import { hideShore } from './controllers/hideShore'
import { cleanShore } from './controllers/cleanShore'

import { reserveBeach } from './controllers/reserveBeach'
import { unhideBeach } from './controllers/unhideBeach'

import { removeCleanShore } from './controllers/removeCleanShore'

import { saveCleanInfo } from './controllers/saveCleaninfo'

export const router = Router()

router.get('/shores', getFreeShores)
router.get('/shore/:key', getShore)
router.get('/shores/reserved', getReservedShores)
router.get('/shores/hidden', getHiddenShores)

router.get('/shores/cleaned', getCleanedShores)

router.get('/reservations/', getReservations)
router.get('/cleaninfos/', getCleanInfos)

router.post('/delete/:key', hideShore)
router.post(
  '/reserve/',
  [
    check('email').exists(),
    check('name').exists(),
    check('organizer').exists(),
    check('starttime').exists(),
    check('endtime').exists(),
    check('phonenumber').exists(),
    check('selected.key').exists(),
    check('selected').exists(),

    check(['startdate', 'enddate']).isISO8601(),
    check('type').isIn(['open', 'private'])
  ],
  reserveBeach
)
router.post('/cleanbeach', saveReservation)
router.post('/cancelcleanbeach', removeReservation)
router.post('/cancelcleanedbeach', removeCleanShore)
router.post('/unhidebeach', unhideBeach)

router.post('/clean/', cleanShore)
router.post('/cleaninfo', saveCleanInfo)

router.post('/login', login)
