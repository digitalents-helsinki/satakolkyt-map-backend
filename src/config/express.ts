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
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// Bodyparser
app.use(bodyparser.json()) // support json encoded bodies

app.use(express.static('public'))
app.use('/api', apiRouter)
