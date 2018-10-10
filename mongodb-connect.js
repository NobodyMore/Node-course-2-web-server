const MongoClient=require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost:27017/Users',(err,db)=>{
  if(err){
    return console.log('Unable to Connect to mongodb server');
  }
  console.log('connected to mongodb server');



var addUser=(userName,phoneNumber,password)=>{

db.collection('Users').insertOne({
userName: userName,
password: password,
phoneNumber: phoneNumber,
score: 0
},(err,result)=>{
  if(err){
  return console.log('Unable to insert todo',err);
}
console.log(JSON.stringify(result.ops,undefined,2));
});

};


var getUser=(userName,password)=>{
db.collection('Users').find({userName: 'userName'},{password: 'password'}).toArray().then((docs) => {
  console.log(JSON.stringify(docs, undefined, 2));
});
}


  });
