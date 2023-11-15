var express = require('express');
var router = express.Router();
const eventController = require('../controllers/event.controller');

const communityController = require('../controllers/community.controller');


router.route('/')
    .get(communityController.getAllCommunity)
    .post(communityController.createCommunity)
    .delete(communityController.deleteCommunity)//incomplete

router.route('/:cid')
    .get(communityController.getCommunityById)
    .delete(communityController.deleteCommunityById)

router.route('/:cid/currentEvents')
    .get(eventController.getCurrentEvents)
    .post(eventController.createEvents)
    .delete(eventController.deleteCurrentEvents)


router.route('/:cid/pastEvents')
    .get(eventController.getPastEvents)
    .delete(eventController.deletePastEvents)


router.route('/:cid/currentevents/:eid')
    .get(eventController.getCurrentEventById)
    .delete(eventController.deleteCurrentEventById);

router.route('/:cid/pastEvents/:eid')
    .get(eventController.getPastEventById)
    .delete(eventController.deletePastEventById);

module.exports = router;