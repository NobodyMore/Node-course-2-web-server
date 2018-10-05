const express=require('express');
const hbs=require('hbs');
const fs=require('fs');


const port=process.env.PORT||3100;
var app=express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=('${now}:'+now+'--'+req.method+'--'+req.url);
  console.log(log);
  fs.appendFile('server.log',log,(err)=>{
    if(err){
      console.log('unable to append to server.log');
    }
  });
   next();
});

app.use((req,res,next)=>{
  res.render('maintenance');
});
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res) =>{
res.render('homePage.hbs',{
  pageTitle: 'Home Page',
  WelcomeMassage: 'Welcome to my first ExpressJs',
  currentYear: new Date().getFullYear()

});
});

app.get('/about',(req,res)=>{
res.render('about.hbs',{
  pageTitle: 'AboutT Page',
  currentYear: new Date().getFullYear()
});
});

// /bad - send back json data with errorMassage
app.get('/bad',(req,res)=>{
res.send({
  errorMassage:'unable to handle request'
});
});

app.listen(port,()=>{
  console.log('server is up on port '+port);
});
