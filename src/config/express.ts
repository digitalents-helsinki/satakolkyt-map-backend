import express from 'express'
import bodyparser from 'body-parser'
import { router as apiRouter } from '@/api'
import cookieParser from 'cookie-parser'
import crypto from 'crypto'
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
const verifyGitHub = req => {
  if (!req.headers['user-agent'].includes('GitHub-Hookshot')) {
    return false
  }
  // Compare their hmac signature to our hmac signature
  // (hmac = hash-based message authentication code)
  const theirSignature = req.headers['x-hub-signature']
  const payload = JSON.stringify(req.body)
  const secret = process.env.SECRET // TODO: Replace me
  const ourSignature = `sha1=${crypto
    .createHmac('sha1', secret)
    .update(payload)
    .digest('hex')}`
  return crypto.timingSafeEqual(
    Buffer.from(theirSignature),
    Buffer.from(ourSignature)
  )
}
app.post('push', (req, res) => {
  if (verifyGitHub(req)) {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Thanks GitHub <3')
  }
})

app.use(allowCrossDomain)

// Bodyparser
app.use(bodyparser.json()) // support json encoded bodies

app.use(express.static('public'))
app.use('/api', apiRouter)
