const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var bodyParser = require('body-parser');




const port=process.env.PORT||3100;
var app=express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=('${now}:'+now+'--'+req.method+'--'+req.url+JSON.stringify(req.body));

  console.log(log);
  fs.appendFile('server.log',log,(err)=>{
    if(err){
      console.log('unable to append to server.log');
    }
  });
   next();
});

var sortByScore=()=>{
var scores=[];
var scoreString=fs.readFileSync('scores-data')
scores=JSON.parse(scoreString);
scores=scores.sort(function(obj1, obj2) {
	// Ascending: first age less than the previous
	return obj2.score-obj1.score;
});
fs.writeFileSync('scores-data',JSON.stringify(scores))
};

var seeScoresFromStart=(number)=>{
var rscores=[];
var scores=[];
var scoreString=fs.readFileSync('scores-data');
scores=JSON.parse(scoreString);
for(var i=0;i<number;i++){
  rscores.push(scores[i]);
}
for(var i=0;i<number;i++){
  console.log(rscores[i]);
}
};


var seeScoresByName=(name)=>{
  var scores=[];
  var scoreString=fs.readFileSync('scores-data')
  scores=JSON.parse(scoreString);
  for(var i=0;i<scores.length;i++){
    if(scores[i].name==name){
      console.log(scores[i]);
      break;
    }
  }
};


var addScore=(score,name)=>{
var scores=[];
var score={
  name,
  score
};

var scoreString=fs.readFileSync('scores-data');
scores=JSON.parse(scoreString);
scores.push(score);
fs.writeFileSync('scores-data',JSON.stringify(scores))
sortByScore();
};

var deleteScores=()=>{
var scores=[];

fs.writeFileSync('scores-data',JSON.stringify(scores))
};



app.use(express.static(__dirname+'/public'));





app.post('/',(req,res) =>{
addScore(JSON.stringify(req.body.score),JSON.stringify(req.body.name));

});


app.delete('/',(req,res) =>{
deleteScores();
});


app.get('/top',(req,res) =>{
seeScoresFromStart(1);

});

app.post('/name',(req,res) =>{
  seeScoresByName(req.body.name);

});



app.listen(port,()=>{
  console.log('server is up on port '+port);
});
