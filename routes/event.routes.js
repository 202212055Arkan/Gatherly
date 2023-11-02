var express = require('express');
var router = express.Router();

const eventController = require('../controllers/event.controller');


router.route('/')
    .get()
    .post(eventController.createEvents)
    .put()
    .delete()


module.exports = router;