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


app.post('/users/score', (req, res) => {
  var query = { userName: req.body.userName };
  User.findOneAndUpdate(query, {
    $set: {
      score: req.body.score
    }
  }, ()=>{
    res.send('saved');
  }
);
});



app.get('/users/score', (req, res) => {
  User.find().then((users) => {
    res.send({
      users
    });
  }, (e) => {
    res.status(400).send(e);
  })
});





app.post('/users/me', (req, res) => {

  User.find({

    }, {
        userName: 1,
        score: 1
    },function(err,response){
      for(var i=0;i<response.length;i++){
    if(response[i].userName==req.body.userName){
      var output=[];
      for(var j=i+2;j<i-2;j--){
        output.push(response[j]);
      }
      res.send(output);
    }
  }
    })
    .sort({
        score: -1
    });



});



app.listen(3100, () => {
  console.log('started on port 3100');
});
