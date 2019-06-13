import { RequestHandler } from 'express'

//THIS IS RUN BY CRON AFTER cron.sh HAS BEEN EXECUTED

export const sendCleanupEmail: RequestHandler = async (req, res, next) => {
  const pass = req.params.pw
  console.log('Running cleanup email send routine...')
  if (pass === process.env.CRON_EMAIL_PASS) {
    console.log('Pass OK')

    //TODO: Implement mail logic

    res.sendStatus(200)
  } else {
    res.sendStatus(403)
  }
}
