import { Router } from 'express'
import { getShores } from './controllers/getShores'

export const router = Router()

router.get('/shores', getShores)
