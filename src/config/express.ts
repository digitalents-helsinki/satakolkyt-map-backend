import express from 'express'
import bodyparser from 'body-parser'
import { router as apiRouter } from '@/api'
import cors from 'cors'
export const app = express()
//cors
app.use(cors())
// Bodyparser
app.use(bodyparser.json()); // support json encoded bodies
  app.use(express.static('public'));
app.use('/api', apiRouter)
