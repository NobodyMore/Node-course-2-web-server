var express = require('express');
var bodyParser = require('body-parser');

var {
  mongoose
} = require('./db/mongoose.js');
var {
  User
} = require('./models/user');

var app = express();

app.use(bodyParser.json());



app.use((req, res, next) => {
  console.log('is is right');
  var now = new Date().toString();
  var log = ('${now}:' + now + '-----' + req.method + '--' + req.url + "--" + req.body);

  //  console.log(req);

  next();
});









//make a new user
app.post('/users', (req, res) => {
  var user = new User({
    userName: req.body.userName,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber

  });
  user.save().then((doc) => {
    res.send('UserSaved');
  }, (e) => {
    res.status(400).send(e);
  });
});




//add score
app.post('/users/score', (req, res) => {
  var query = {
    userName: req.body.userName,
    password: req.body.password
  };
  User.findOneAndUpdate(query, {
    $set: {
      score: req.body.score
    }
  }, () => {
    console.log('scoreSaved');
    res.send('ScoreSaved');
  });
});


//get all users
app.get('/users/score', (req, res) => {
  User.find().then((users) => {
    res.send({
      users
    });
  }, (e) => {
    res.status(400).send(e);
  })
});




//get leaderBoard
app.post('/users/me', (req, res) => {
  console.log(req.body);
  User.find({}, {
      userName: 1,
      score: 1
    }, function(err, response) {
      if (err) {
        console.log('error');
        res.send(err);
      }
      for (var i = 0; i < response.length; i++) {
        if (response[i].userName == req.body.userName) {
          console.log(response[i].userName);
          var output = [];
          console.log(response.length);
          var g = 0;
          for (var j = i - 2; j <= (i + 2); j++) {
            response[j].rank = j + 1;
            output.push(response[j]);

            g += 1;
            console.log(output[g]);
          }
          res.send(output);
        }
      }
    })
    .sort(
      "-score"
    );
});



app.listen(3200, () => {
  console.log('started on port 3200');
});
