const mongoose = require('mongoose')

let uri = 'mongodb://localhost:27017/Users'
let options = {
  user: 'root',
  pass: 'Ha021mid',
  authSource: 'admin',
  promiseLibrary: global.Promise,
  useNewUrlParser: true
}

mongoose.connect(uri, options)
// let db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function () {
//   console.log('database connected!')de
// })
module.exports = {mongoose}
