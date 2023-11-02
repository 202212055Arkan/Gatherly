var express = require('express');
var router = express.Router();

const interestController = require('../controllers/interest.controller');

// router.route('/')
//     .get()
//     .post()
//     .put()
//     .delete()

router.post('/',interestController.addInterest);
    
module.exports = router;