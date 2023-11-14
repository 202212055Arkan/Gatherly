var express = require('express');
var router = express.Router();

const interestController = require('../controllers/interest.controller');

// router.route('/')
//     .get()
//     .post()
//     .put()
//     .delete()

router.route('/')
    .get(interestController.getAllInterest)
    .post(interestController.addInterest)
    .delete(interestController.deleteInterests);

router.route('/:interestName/events')
    .get(interestController.getEventsOfInterest);
    
module.exports = router;