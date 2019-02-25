import 'module-alias/register'

import { app } from './config/express'

const start = async () => {
  const port = 8089
  app.listen(port, () => {
    console.log('App listening on port ' + port)
  })
}

start()

process.once('SIGHUP', function() {
  console.clear()
})
