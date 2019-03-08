import express from 'express'
import bodyparser from 'body-parser'
import { router as apiRouter } from '@/api'
import cors from 'cors'
export const app = express()
//cors
app.use(cors())
// Bodyparser
app.use(bodyparser.urlencoded({ extended: false }))
  app.use(express.static('public'));
app.use('/api', apiRouter)
