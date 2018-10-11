var express=require('express');
var bodyParser=require('body-parser');

var {mongoose}=require('./db/mongoose.js');
var {User}=require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/users',(req,res)=>{
  var todo=new User({
    userName:req.body.userName,
    password:req.body.password,
    phoneNumber:req.body.phoneNumber

  });
  todo.save().then((doc)=>{
    res.send('UserSaved');
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get('/users',()=>{

});

app.listen(3100,()=>{
  console.log('started on port 3100');
});
