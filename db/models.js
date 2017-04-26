'use strict';
var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
   text: String,
   username: String,
   createdAt: {type: Date, default: Date.now},
   updatedAt: {type: Date, default: Date.now},
   votes: {type: Number, default: 0}
});

AnswerSchema.method("update", function(updates, cb){
   Object.assign(this, updates, {updatedAt: new Date()});
   this.parent().save(cb);
})

AnswerSchema.method("vote", function(vote, cb){
   // this.parent() === undefined
   if(vote === "up"){
      this.votes += 1;
   } else if (vote === "down" && this.votes !== 0){
      this.votes -= 1;
   }
   this.parent().save(cb);
})


var QuestionSchema = new Schema({
   title: {type: String},
   username: String,
   text: {type: String},
   createdAt: {type: Date},
   answers: [AnswerSchema]

});

QuestionSchema.pre("save", function(next){
   // this.answers is always === undefined
   if(!this.answers) return next();
   this.answers.sort((a, b)=>{
      if(a.votes === b.votes){
         // JS WILL SUBTRACT DATES AND RETURN THEM IN MILLISECONDS
         return b.updatedAt - a.updatedAt;
      }
      return b.votes - a.votes;

   })
   next();
})



var Question = mongoose.model("Question", QuestionSchema);

module.exports.Question = Question;
