var mongoose = require('mongoose');

var User=mongoose.model('User',{
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
    default: 0
  }
});

module.exports={User};
