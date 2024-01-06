import mongoose from 'mongoose'
//import { isEmail } from 'validator';
import bcrypt from 'bcryptjs'

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
})

const Member = mongoose.model('Member', MemberSchema)
export default Member
