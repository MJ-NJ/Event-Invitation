import mongoose from 'mongoose'

function connect(url) {
  try {
    return mongoose.connect(url)
  } catch (error) {
    console.log(error.message)
  }
}

export { connect }
