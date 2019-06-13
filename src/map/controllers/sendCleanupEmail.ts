import { RequestHandler } from 'express'

//RUN THIS FILE WITH CRON, ADD TO CRONTAB:
// 0 3 * * * curl localhost:8089/api/map/cleanupemail/[passhere]

export const sendCleanupEmail: RequestHandler = async (req, res, next) => {
  const pass = req.params.pw
  console.log('Cron email test. Pass:', pass)
  if (pass === 'test123') {
    //TODO: get from env file
    console.log('Pass OK')
    //TODO: Implement mail logic
    res.sendStatus(200)
  } else {
    res.sendStatus(403)
  }
}
