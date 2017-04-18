"use strict";
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/sandbox");

var db = mongoose.connection;


// listen for events in DB using .on
db.on('error', (err) => {
 console.error('connection error', error)

});



db.once('open', ()=>{
   console.log('db connection successfull')
   var Schema = mongoose.Schema;
   var AnimalSchema = new Schema({
      type: String,
      size: String,
      color: String,
      mass: Number,
      name: String

   });
   var Animal = mongoose.model("Animal", AnimalSchema);
   var elephant = new Animal({
      type: "elephant",
      size: "big",
      color: "gray",
      mass: 6000,
      name: "Lawerence"
   });

   elephant.save((err)=>{
      if(err) console.error("Save Failed", err);
      else console.log('Saved!');
      db.close(()=>{
         console.log('db closed!')

      });
   });
});
