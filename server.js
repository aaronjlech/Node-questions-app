// 'use strict';
var express = require('express')
var routes = require('./routes');
var jsonParser = require('body-parser').json;
var mongoose = require('mongoose');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

mongoose.connect("mongodb://localhost/qa");

var db = mongoose.connection;
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
var compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/public'));

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));
db.on('error', (err) => {
 console.error('connection error', error)

});
db.once('open', ()=>{ });
app.use('/questions', routes);
app.use(jsonParser());
var port = process.env.PORT || 3000;


app.listen(port,()=> console.log("server listening at", port) );
