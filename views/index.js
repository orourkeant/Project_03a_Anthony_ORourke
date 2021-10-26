var express = require('express');
var app = express();
var PORT = 3000;
 
app.set('view engine','pug');
app.get('/',function(req,res)
{
res.render('index',
{title:'Guru99',message:'Welcome'})
});
var server=app.listen(3000,function() {});
 
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});


/*app.route('/Node').get(function(req,res)
{
    res.send("Tutorial on Node");
});
app.route('/Angular').get(function(req,res)
{
    res.send("Tutorial on Angular");
});
app.get('/',function(req,res){
    res.send('Welcome to Guru99 Tutorials');
});*/