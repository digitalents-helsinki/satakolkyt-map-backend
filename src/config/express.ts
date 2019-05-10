import express from 'express'
import bodyparser from 'body-parser'
import { router as apiRouter } from '@/api'
import cookieParser from 'cookie-parser'

export const app = express()

app.use(cookieParser())

//cors
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Credentials', 'true')

  next()
}
app.use(allowCrossDomain)
// Bodyparser
app.use(bodyparser.json()) // support json encoded bodies

app.use(express.static('public'))
app.use('/api', apiRouter)
