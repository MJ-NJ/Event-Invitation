import multer from 'multer'
import path from 'path'
var types = ['text/csv']

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname)
    cb(null, file.fieldname + Date.now() + ext)
  },
})
// var storage = multer.memoryStorage()
var upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    if (types.includes(file.mimetype)) {
      callback(null, true)
    } else {
      console.log(types + file.mimetype)
      console.log('File not accepted')
    }
  },
})

export { upload }
