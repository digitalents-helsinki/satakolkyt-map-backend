import express from 'express'
import bodyparser from 'body-parser'
import { router as apiRouter } from '@/api'

export const app = express()

// Bodyparser
app.use(bodyparser.urlencoded({ extended: false }))

app.use('/api', apiRouter)
