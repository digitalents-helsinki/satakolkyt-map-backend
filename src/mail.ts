const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'mail04.domainhotelli.fi',
  port: 587,
  secure: false,
  auth: {
    user: 'noreply@satakolkyt.fi',
    pass: 'm,z8~M2s'
  }
})

export const sendMail = (to, subject, html) => {
  transporter.sendMail({
    from: '"Satakolkyt" <noreply@satakolkyt.fi>',
    to: to,
    subject: subject,
    html: html
  })
}
