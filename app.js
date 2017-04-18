'use strict';
var express = require('express')
var routes = require('./routes');
var jsonParser = require('body-parser').json;

// var jsonCheck = function(req, res, next){
//    if(req.body){
//       console.log('the sky is', req.body.color);
//
//    } else {
//       console.log("there is no property in the body");
//    }
//    next();
//
// }


var app = express();
// app.use((req, res, next)=>{
//    console.log("first piece of middleware")
//    // pass down data by attaching it to the the req object
//    req.passThis = "hey there"
//    // access querystring values ie: /?queryKey=hello+world
//    // req.query.queryKey === hello+world
//    next()
// })
// app.use('/different/',function(req, res, next){
//    console.log("second piece of middleware",req.query.color)
//
//    next()
//
// })
app.user('questions', routes);
app.use(jsonParser());
var port = process.env.PORT || 3000;


app.listen(port,function(){
   console.log("server listening at", port)


});
