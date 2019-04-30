import express from 'express'
import bodyparser from 'body-parser'
import { router as apiRouter } from '@/api'
import cors from 'cors'
import cookieParser from 'cookie-parser'

export const app = express()

app.use(cookieParser())

//cors
app.use(
  cors({
    origin: '*',
    credentials: false
  })
)

// Bodyparser
app.use(bodyparser.json()) // support json encoded bodies

app.use(express.static('public'))
app.use('/api', apiRouter)
