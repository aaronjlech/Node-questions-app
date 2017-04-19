'use strict';
var express = require('express');

var router = express.Router();

//GET ALL /questions
router.get('/', (req, res)=>{
   res.json({response: "You sent me a GET request"});

});

// POST /questions
// Route for creating questions
router.post("/", (req, res)=>{
   res.json({
      response: "You sent a POST request",
      body: req.body
   })
})

// GET /questions/:id
// ROUTE for specific question
router.get('/:id', (req, res)=>{
   res.json({
      response: `you sent a request for ${req.params.id}`
   })


})
// GET ANSWERS BY QUESTION ID
router.get('/:id/answers', (req, res) => {
   res.json({
      response: "you sent a get request for answers to " + req.params.id,
   })
})
// POST ANSWER TO QUESTIONS
router.post('/:id/answers', (req, res) => {
   res.json({
      response: 'you sent a post? request to answers' + req.params.id,
      questionId: req.params.id,
      body: req.body
   })
})

// EDIT ANSWER ROUTE
router.put('/:id/answers/:aID', (req, res) => {
   res.json({
      response: "you sent a put request to " + req.params.id,
      questionId: req.params.id,
      answerId: req.params.aID,
      body: req.body
   })

})

//DELETE ANSWER ROUTE
router.delete('/:id/answers/:aID', (req, res) => {
   res.json({
      response: 'you sent a delete request to ' + req.params.id,
      questionId: req.params.id,
      answerId: req.params.aID
   })
})

// POST VOTE UP OR VOTE DOWN FUNCTION
// POST  /questions/:id/answers/:aID/vote-down
// POST  /questions/:id/answers/:aID/votw-up
router.post('/:id/answers/:aID/vote-:dir', (req, res, next) =>{
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
