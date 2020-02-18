const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'mail04.domainhotelli.fi',
  port: 587,
  secure: false,
  auth: {
    user: 'noreply@satakolkyt.fi',
    pass: process.env.EMAIL_PASS
  }
})

interface sendMailOptions {
  attachments?: boolean
}

export const sendMail = (to, subject, html, options: sendMailOptions = {}) => {
  const opts = {
    from: '"SATAKOLKYT" <noreply@satakolkyt.fi>',
    to,
    subject,
    html
  }
  if (options.attachments) {
    Object.assign(opts, {
      attachments: [
        {
          filename: 'fbook.png',
          path: process.cwd() + '/assets/fbook.png',
          cid: 'd0557c41-f196-41fd-abbf-cfe3dd5356dd'
        },
        {
          filename: 'inst.png',
          path: process.cwd() + '/assets/inst.png',
          cid: '350673a5-5d18-4966-a9cb-fde89287b726'
        },
        {
          filename: 'twit.png',
          path: process.cwd() + '/assets/twit.png',
          cid: 'abb0ad98-b191-4afb-8266-4b97c05938ea'
        },
        {
          filename: 'satakolkyt.jpeg',
          path: process.cwd() + '/assets/satakolkyt.jpeg',
          cid: '29137d21-03d2-4f7f-a944-4c0949dff9e4'
        }
      ]
    })
  }
  transporter.sendMail(opts)
}
