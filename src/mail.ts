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

export const sendMail = (to, subject, html) => {
  transporter.sendMail({
    from: '"SATAKOLKYT" <noreply@satakolkyt.fi>',
    to: to,
    subject: subject,
    html: html
  })
}
