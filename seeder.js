import mongoose from 'mongoose'
import User from './models/User.js'
import csv from 'csv-parser'
import qrCode from 'qrcode'
import nodemailer from 'nodemailer'
import fs from 'fs'
import { connect } from './database/db.js'
import 'dotenv/config'

// var counter = 0
// ;(async function connectDb() {
//   await connect(process.env.MONGO_URI)
// })()

function readFile(req, res) {
  fs.createReadStream('data.csv')
    .pipe(csv({}))
    .on('data', (data) => {
      create_user(data)
      // test(data)
    })
    .on('end', () => {
      console.log('CSV file successfully processed')
    })
}
async function create_user(data) {
  const userExists = await User.findOne({ email: data.email })
  if (userExists) {
    return
  }
  const user = new User({
    name: data.name,
    email: data.email,
    rollNo: data.rollNo,
    slot: data.slot,
  })
  await user.save()
  //qrcode

  const qr = await qrCode.toDataURL(user._id.toString())

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '#', // generated ethereal user
      pass: '#', // generated ethereal password
    },
  })

  let info = await transporter.sendMail({
    from: '"Owasp" <jogeshgupta963@gmail.com>',
    to: user.email,
    subject: 'Test Mail',
    text: 'You have been invited to the event',

    attachments: [
      // File Stream attachment
      {
        filename: 'invite.png',
        path: qr,
      },
    ],
  })
}

// readFile()
export { readFile }
