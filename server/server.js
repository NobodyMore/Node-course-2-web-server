const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const {
  User
} = require('./models/user')

// const {
//   mongoose
// } = require('./db/mongoose')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  // console.log('is is right')
  let now = new Date().toString()
  let log = ('${now}:' + now + '-----' + req.method + '--' + req.url + '--' +
    req.body)
  console.log(log)
  next()
})

//make a new user
app.post('/users', (req, res) => {
  let user = new User({
    userName: req.body.userName,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber
  })
  console.log('log')
  user.save(err => {
    if (err) {
      res.status(400).send(err)
    }
    res.send('UserSaved')
  })
  // user.save().then((doc) => {
  //   res.send('UserSaved')
  // }, (e) => {
  //   res.status(400).send(e)
  // })
})

//add score
app.post('/users/score', (req, res) => {
  let query = {
    userName: req.body.userName,
    password: req.body.password
  }
  User.findOneAndUpdate(query, {
    $set: {
      score: req.body.score
    }
  }, () => {
    console.log('scoreSaved')
    res.send('ScoreSaved')
  })
})

//get all users
app.get('/users/score', (req, res) => {
  User.find().then((users) => {
    res.send({
      users
    })
  }, (e) => {
    res.status(400).send(e)
  })
})

//get leaderBoard
app.post('/users/me', (req, res) => {
  console.log(req.body)
  User.find({}, {
    userName: 1,
    score: 1
  }, function (err, response) {
    if (err) {
      console.log('error')
      res.send(err)
    }
    for (let i = 0; i < response.length; i++) {
      if (response[i].userName == req.body.userName) {
        console.log(response[i].userName)
        let output = []
        console.log(response.length)
        let g = 0
        for (let j = i - 2; j <= (i + 2); j++) {
          response[j].rank = j + 1
          output.push(response[j])
          g += 1
          console.log(output[g])
        }
        res.send(output)
      }
    }
  }).sort(
    '-score'
  )
})

let options = {
  useMongoClient: true,
  user: 'root',
  pass: 'Ha021mid',
  authSource: 'admin'
}

mongoose.connect('mongodb://localhost:27017/Users', options)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('database connected!')
})

app.listen(3200, () => {
  console.log('started on port 3200')
})


