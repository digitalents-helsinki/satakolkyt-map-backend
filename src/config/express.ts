import express from 'express'
import bodyparser from 'body-parser'
import { router as apiRouter } from '@/api'
import cors from 'cors'
const csurf = require('csurf')
const cookieParser = require('cookie-parser')
export const app = express()

const csrfMiddleware = csurf({
  cookie: true
})
//cors
app.use(cors())
// Bodyparser
app.use(bodyparser.json()) // support json encoded bodies
app.use(cookieParser())
app.use(csrfMiddleware)
app.use(express.static('public'))
app.use('/api', apiRouter)
