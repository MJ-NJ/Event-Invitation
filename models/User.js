import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
  },
  slot: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
})
UserSchema.set('timeStamps', true)

const User = mongoose.model('User', UserSchema)
export default User
