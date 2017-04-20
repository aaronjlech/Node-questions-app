'use strict';
var express = require('express')
var routes = require('./db/routes');
var jsonParser = require('body-parser').json;
var mongoose = require('mongoose');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var logger = require('morgan');




mongoose.connect("mongodb://localhost/qa");

var db = mongoose.connection;



var app = express();

app.use(logger('dev'));
app.use(jsonParser());

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
 console.error('connection error', err)
});

db.once('open', ()=>{
   console.log("connection successful");
});

app.use((req, res, next)=>{
   res.header('Acesss-Control-Allow-Origin', "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With", "Content-Type, Accept");
   if(req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, DELTE");
      return res.status(200).json({});
   }
   next();
})
app.use('/questions', routes);


app.use(function(req, res, next){
   var err = new Error("Not Found");
   err.status = 404;
   next(err);
})

// Error Handler
app.use(function(err, req, res, next){
   res.status(err.status || 500);
   res.json({
      error: {
         message: err.message
      }
   })
})

var port = process.env.PORT || 3000;


app.listen(port,()=> console.log("server listening at", port) );
