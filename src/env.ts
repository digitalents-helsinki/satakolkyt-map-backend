import { resolve } from 'path'
import dotenv from 'dotenv-safe'

dotenv.config({
  path: resolve(process.cwd(), '.env'),
  example: resolve(process.cwd(), '.env.example')
})
