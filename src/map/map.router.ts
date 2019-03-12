import { Router } from 'express'
import { getShores } from './controllers/getShores'
import { getShore } from './controllers/getShore'

export const router = Router()

router.get('/shores', getShores)
router.get('/shore/:key', getShore)
