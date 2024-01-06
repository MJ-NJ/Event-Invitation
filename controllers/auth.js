import Member from '../models/Member.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

//@route /user/login
//@desc POST login user
//@access Public
async function loginUser(req, res) {
  try {
    const user = await Menubar.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).json('User not found')
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) {
      return res.status(400).json('Invalid password')
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_COOKIE_EXPIRES_IN,
    })

    res.cookie('JWT', token, {
      expiresIn: process.env.JWT_COOKIE_EXPIRES_IN,
    })

    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

//@route /user/register
//@desc POST register user
//@access Public
async function registerUser(req, res) {
  try {
    const user = await Member.findOne({ email: req.body.email })
    if (user) {
      throw new Error('User already exists')
    }

    req.body.password = await bcrypt.hash(req.body.password, 10)

    const newUser = await Member.create(req.body)
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_COOKIE_EXPIRES_IN,
    })
    res.cookie('JWT', token, {
      expiresIn: process.env.JWT_COOKIE_EXPIRES_IN,
    })
    return res.status(200).json(newUser)
  } catch (err) {
    res.status(404).json(err.message)
  }
}

export { registerUser, loginUser }
