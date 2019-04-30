import 'module-alias/register'
import './env'
import { connect } from './config/arangodb'
import { config } from './config/index'
import { app } from './config/express'
const Sentry = require('@sentry/node')

const start = async () => {
  try {
    await connect()
    Sentry.init({
      dsn: 'https://04bfcb6dc6534683894daf06d484339f@sentry.io/1446248'
    })

    app.listen(config.port, () => {
      console.log('App listening on port ' + config.port)
    })
  } catch (err) {
    console.error(err)
  }
}

start()

process.once('SIGHUP', function() {
  console.clear()
})
