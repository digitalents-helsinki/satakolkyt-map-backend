import { RequestHandler } from 'express'
import ReservationModel from '../model/reservation'
import { sendMail } from '../../mail'
import { generateTitle, composeMessage } from '../../messages/composeMessage'

//THIS IS RUN BY CRON AFTER cron.sh HAS BEEN EXECUTED

export const sendCleanupEmail: RequestHandler = async (req, res, next) => {
  const pass = req.params.pw
  if (pass === process.env.CRON_EMAIL_PASS) {
    console.log('Running cleanup email send routine...')
    const reservs = await ReservationModel.getReservations()
    const today = new Date().toISOString().substr(0, 10)
    let count = 0
    for (let r of reservs) {
      if (!r.reminder_email_sent && r.confirmed) {
        const date = new Date(r.startdate + 'T' + r.endtime + ':00')
          .toISOString()
          .substr(0, 10)
        if (today === date) {
          sendMail(
            r.email,
            generateTitle('reminder'),
            composeMessage('reminder'),
            {
              attachments: true
            }
          )
          count++
          for (let rr of reservs) {
            if (rr.multiID == r.multiID) {
              rr.reminder_email_sent = true
            }
          }
          await ReservationModel.updateRemindedByMultiID(r.multiID)
        }
      }
    }
    console.log(count, 'email(s) sent')

    res.sendStatus(200)
  } else {
    res.sendStatus(403)
  }
}
