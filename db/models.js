'use strict';
var mongoose = require('mongoose');


var Schema = mongoose.Schema;



var QuestionSchema = new Schema({
   test: {type: String},
   createdAt: {type: Date},
   answers: [AnswerSchema],

})
