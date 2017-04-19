'use strict';
var express = require('express');

var router = express.Router();
var Question = require('./models').Question;


// Middleware to handle requests for questions ID dynamically
router.param('qID', (req, res, next, id)=>{
   Question.findById(req.params.qID, (err, doc)=>{
      if(err) return next(err);
      if(!doc){
         err = new Error("Not Found");
         err.status = 404;
         return next(err);
      }
      req.question = doc;
      res.json(doc);
   ]);
})

router.param('aID'), (req, res, next, id)=>{
   req.answer = req.question.answers.id(id);
   if(!req.answer){
      err = new Error('Not Found');
      err.status = 404;
      return next(err);
   }
   next();
}
//GET ALL /questions
router.get('/', (req, res, next)=>{
   Question.find({})
            .sort({createdAt: -1})
            .exec( (err, questions)=>{
               if(err) return next(err);
               res.json(questions);
            })

});

// POST /questions
// Route for creating questions
router.post("/", (req, res)=>{
   // create new model of a question
   let question = new Question(req.body);
   question.save((err, question)=>{
      if(err) return next(err);
      // Tell client data was saved successfully
      res.status(201);
      res.json(question);
   })

})

// GET /questions/:qID
// ROUTE for specific question
router.get('/:qID', (req, res)=>{
   res.json(req.question);


})
// GET ANSWERS BY QUESTION ID
router.get('/:qID/answers', (req, res) => {
   res.json({
      response: "you sent a get request for answers to " + req.params.id,
   })
})
// POST ANSWER TO QUESTIONS
router.post('/:qID/answers', (req, res, next) => {
   req.question.answers.push(req.body);
   req.question.save((err, question)=>{
      if(err) return next(err);
      // Tell client data was saved successfully
      res.status(201);
      res.json(question);
   });

})

// EDIT ANSWER ROUTE
router.put('/:qID/answers/:aID', (req, res) => {
   res.json({
      response: "you sent a put request to " + req.params.id,
      questionId: req.params.id,
      answerId: req.params.aID,
      body: req.body
   })

})

//DELETE ANSWER ROUTE
router.delete('/:qID/answers/:aID', (req, res) => {
   res.json({
      response: 'you sent a delete request to ' + req.params.id,
      questionId: req.params.id,
      answerId: req.params.aID
   })
})

// POST VOTE UP OR VOTE DOWN FUNCTION
// POST  /questions/:qID/answers/:aID/vote-down
// POST  /questions/:qID/answers/:aID/votw-up
router.post('/:qID/answers/:aID/vote-:dir', (req, res, next) =>{
      if(req.params.dir.search(/^(up|down)$/) === -1) {
         var err = new Error('Not Found');
         err.status = 404;
         next(err);
      } else {
      next();
      }

   },  (req, res) => {

   res.json({
      response: 'you sent a post request to vote ups' + req.params.id,
      questionId: req.params.id,
      answerId: req.params.aID,
      vote: req.params.dir
   })
})
module.exports = router;

//GET /questions/5/answers
