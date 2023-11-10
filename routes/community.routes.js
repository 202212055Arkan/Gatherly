var express = require('express');
var router = express.Router();
const eventController = require('../controllers/event.controller');

const communityController = require('../controllers/community.controller');

// router.route('/')
//     .get()
//     .post()
//     .put()
//     .delete()

router.route('/')
    .get(communityController.getAllCommunity)
    .post(communityController.createCommunity)
    .delete(communityController.deleteCommunity)

router.route('/:cid/events')
    .get(eventController.getEvents)
    .post(eventController.createEvents)
    .delete(eventController.deleteEvents)


module.exports = router;