// Copyright (C) 2019 Digitalents Helsinki

import 'module-alias/register'
import './env'
import { connect } from './config/arangodb'
import { config } from './config/index'
import { app } from './config/express'

const start = async () => {
  try {
    await connect()

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
