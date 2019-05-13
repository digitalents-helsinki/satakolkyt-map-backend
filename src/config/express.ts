import express from 'express'
import bodyparser from 'body-parser'
import { router as apiRouter } from '@/api'
import cookieParser from 'cookie-parser'
import GithubWebHook from 'express-github-webhook'
export const app = express()

app.use(cookieParser())

//cors
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,x-csrf-token,authorization'
  )
  res.header('Access-Control-Allow-Credentials', 'true')

  next()
}
var webhookHandler = GithubWebHook({
  path: '/push',
  secret: process.env.SECRET
})
app.use(allowCrossDomain)
app.use(webhookHandler)
webhookHandler.on('push', function(repo, data) {
  //do something
})

// Bodyparser
app.use(bodyparser.json()) // support json encoded bodies

app.use(express.static('public'))
app.use('/api', apiRouter)
