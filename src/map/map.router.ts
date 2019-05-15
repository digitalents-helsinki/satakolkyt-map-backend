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
import { confirmCleaned } from './controllers/confirmCleaned'

import { reserveBeach } from './controllers/reserveBeach'
import { unhideBeach } from './controllers/unhideBeach'

import { cancelCleanShore } from './controllers/cancelCleanShore'

import { saveCleanInfo } from './controllers/saveCleaninfo'
import { deleteReservation } from './controllers/deleteReservation'

const csrf = require('csurf')
import { csrfToken } from './controllers/csrfToken'
import { deleteCleanedShore } from './controllers/deleteCleanedShore'

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
    check('starttime').matches(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/),
    check('endtime').matches(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/),
    check('openevent').exists(),
    check('openinfo').exists(),
    check('openlink').exists(),
    check('name').exists(),
    check('email').isEmail({ require_tld: false }),
    check('phonenumber').exists(),
    check('selected.key').exists(),
    check('selected').exists()
  ],
  reserveBeach
)
router.post('/confirmreservation', confirmReservation)
router.post('/cancelreservation', checkToken, cancelReservation)
router.post('/cancelcleanedbeach', checkToken, cancelCleanShore)
router.post('/unhidebeach', checkToken, unhideBeach)
router.delete('/reservation', checkToken, deleteReservation)
router.delete('/cleanedshore', checkToken, deleteCleanedShore)
router.post('/clean/', confirmCleaned)
router.post(
  '/cleaninfo',
  [
    check('organizer_name').exists(),
    check('leader_name').exists(),
    check('leader_phone').exists(),
    check('leader_email').isEmail({ require_tld: false }),
    check('group_size')
      .toInt()
      .isInt({ min: 1 }),
    check('trash_amount')
      .toInt()
      .isInt({ min: 1, max: 4 }),
    check('selected.key').exists(),
    check('selected').exists(),
    check(['date']).isISO8601(),
    check('trash_left').isIn(['yes', 'no']),
    check('trash_bags_info').exists(),
    check('kurtturuusu').isIn(['yes', 'no', 'idk']),
    check('jattipalsami').isIn(['yes', 'no', 'idk']),
    check('foreignspeciesdetail').exists(),
    check('cleanmoreinfo').exists()
  ],
  saveCleanInfo
)

router.post('/login', login)
