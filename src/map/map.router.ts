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
import { deleteReservation } from './controllers/deleteReservation'

export const router = Router()

router.get('/shores', getFreeShores)
router.get('/shore/:key', getShore)
router.get('/shores/reserved', getReservedShores)
router.get('/shores/hidden', getHiddenShores)

router.get('/shores/cleaned', getCleanedShores)

router.get('/reservations/', checkToken, getReservations)
router.get('/cleaninfos/', checkToken, getCleanInfos)

router.post('/delete/:key', checkToken, hideShore)
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
router.post('/cancelcleanbeach', checkToken, removeReservation)
router.post('/cancelcleanedbeach', checkToken, removeCleanShore)
router.post('/unhidebeach', checkToken, unhideBeach)
router.delete('/reservation', checkToken, deleteReservation)
router.post('/clean/', cleanShore)
router.post(
  '/cleaninfo',
  [
    check('organizer_name').exists(),
    check('leader_name').exists(),
    check('leader_phone').exists(),
    check('group_size').exists(),
    check('trash_amount').exists(),
    check('phonenumber').exists(),
    check('selected.key').exists(),
    check('selected').exists(),
    check(['date']).isISO8601(),
    check('trash_left').exists(),
    check('kurtturuusu').exists(),
    check('jattipalsami').exists(),
    check('foreignspeciesdetail').exists(),
    check('cleanmoreinfo').exists()
  ],
  saveCleanInfo
)

router.post('/login', login)
