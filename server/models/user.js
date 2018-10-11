var mongoose = require('mongoose');

var User=mongoose.model('Todo',{
  userName:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  phoneNumber:{
    type: String,
    required: true
  },
  score:{
    type: String,
    default: null
  }
});

module.exports={User};
