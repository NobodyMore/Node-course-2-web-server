const mongoose = require('mongoose')

let uri = 'mongodb://localhost:27017/Users'
let options = {
  user: 'root',
  pass: 'Ha021mid',
  authSource: 'admin',
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  keepAlive: true
}

mongoose.connect(uri, options).then(
  () => {console.log('Database connected.')},
  (err) => {console.log((err))}
)

module.exports = {mongoose}
