var express = require('express');






var router = express.Router();




//GET /questions
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


module.exports = router;

//GET /questions/5/answers
