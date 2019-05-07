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

import { getPublicReservedInfoByShoreKey } from './controllers/getPublicReservedInfoByShoreKey'
import { getPublicCleanedInfoByShoreKey } from './controllers/getPublicCleanedInfoByShoreKey'

import { confirmReservation } from './controllers/confirmReservation'
import { cancelReservation } from './controllers/cancelReservation'
import { hideShore } from './controllers/hideShore'
import { cleanShore } from './controllers/cleanShore'

import { reserveBeach } from './controllers/reserveBeach'
import { unhideBeach } from './controllers/unhideBeach'

import { removeCleanShore } from './controllers/removeCleanShore'

import { saveCleanInfo } from './controllers/saveCleaninfo'
import { deleteReservation } from './controllers/deleteReservation'

const csrf = require('csurf')
import { csrfToken } from './controllers/csrfToken'

const csrfProtection = csrf({ cookie: true })

export const router = Router()

router.get('/shores', getFreeShores)
router.get('/token', csrfProtection, csrfToken)

router.get('/shore/:key', getShore)
router.get('/shores/reserved', getReservedShores)
router.get('/shores/hidden', getHiddenShores)

router.get('/shores/cleaned', getCleanedShores)

router.get('/reservations/', checkToken, getReservations)
router.get('/cleaninfos/', checkToken, getCleanInfos)

router.get('/reservedinfo/:key', getPublicReservedInfoByShoreKey)
router.get('/cleanedinfo/:key', getPublicCleanedInfoByShoreKey)

router.post('/delete/:key', checkToken, hideShore)
router.post(
  '/reserve/',
  [
    check('confirmed').exists(),
    check('organizer').exists(),
    check(['startdate', 'enddate']).isISO8601(),
    check('starttime').exists(),
    check('endtime').exists(),
    check('openevent').exists(),
    check('openinfo').exists(),
    check('openlink').exists(),
    check('name').exists(),
    check('email').exists(),
    check('phonenumber').exists(),
    check('selected.key').exists(),
    check('selected').exists()
  ],
  reserveBeach
)
router.post('/confirmreservation', confirmReservation)
router.post('/cancelreservation', checkToken, cancelReservation)
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
    check('trash_bags_info').exists(),
    check('kurtturuusu').exists(),
    check('jattipalsami').exists(),
    check('foreignspeciesdetail').exists(),
    check('cleanmoreinfo').exists()
  ],
  saveCleanInfo
)

router.post('/login', login)
