import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

import { router as userRouter } from './routes/user.js'
import { router as auth } from './routes/auth.js'
import { connect } from './database/db.js'

const port = process.env.PORT

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use('/user', userRouter)
app.use('/auth', auth)
app.get('/',(req,res)=>{
  res.json("server")
})
;(async function () {
  try {
    await connect(process.env.MONGO_URI)
    console.log('DB connected')
    var port = process.env.PORT || 3001
    app.listen(port, () => console.log(`Server started on port ${port}`))
  } catch (err) {
    console.log(err.message)
  }
})()
