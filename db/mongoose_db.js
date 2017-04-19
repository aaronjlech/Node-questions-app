"use strict";



// listen for events in DB using .on



// middleware for adding sizes dynamically by weight





   console.log('db connection successfull')
   var Schema = mongoose.Schema;

   var AnimalSchema = new Schema({
      type: {type: String, default: "goldfish" },
      size:  String,
      color: { type: String, default: "golden" },
      mass: { type: Number, default: 0.007 },
      name: { type: String, default: "Angela" },

   });
   AnimalSchema.pre('save', function(next){
      if(this.mass >= 100){
         this.size = "big";
      } else if (this.mass >= 5 && this.mass < 100){
         this.size = "medium";
      } else {
         this.size = "small";
      }
      next();
   })
   // AnimalSchema.statics.findSmall = function(cb){
   //
   //
   // }
   var Animal = mongoose.model("Animal", AnimalSchema);
   var elephant = new Animal({
      type: "elephant",
      size: "big",
      color: "gray",
      mass: 6000,
      name: "Lawerence"
   });

   var animalData = [
      {
         type: "dog",
         color: 'black',
         mass: 50,
         name: "ace"
      },
      {
         type: "cat",
         color: 'white',
         mass: 20,
         name: "Cat"
      },
      elephant

   ]

   Animal.remove({}, function(err){
      if(err) console.error(err);
      Animal.create(animalData, function(err, animals){
         console.log(animalData)
         if(err) console.error(err);
         Animal.find({}, function(err, animals){
            console.log(animals)
            if(err) console.error(err);
            animals.forEach(function(animal){
               console.log('yo yo',animal.name, animal.color, animal.type);
            });
            db.close(function(){

               console.log("db closed down!");
            })

         })



      })
   });

//creates generic animal
   // Animal.remove({}); //clears Animal DB

   // animal.save((err)=>{
   //    if(err) console.error("Save Failed", err);
   //
   //    else console.log('Saved!');
   //    db.close(()=>{
   //       console.log('db closed!')
   //
   //    });
   // });
});
