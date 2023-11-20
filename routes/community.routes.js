var express = require('express');
var router = express.Router();
const {verifyUser,verifyCommunityAdmin} = require("../middlewares/authentication");
const eventController = require('../controllers/event.controller');

const communityController = require('../controllers/community.controller');


router.route('/')
    .get(communityController.getAllCommunity)
    .post(verifyUser,communityController.createCommunity)
    .delete(communityController.deleteCommunity)//incomplete

router.route('/:cid')
    .get(communityController.getCommunityById)
    .delete(verifyUser,verifyCommunityAdmin,communityController.deleteCommunityById)

router.route('/:cid/currentEvents')
    .get(eventController.getCurrentEvents)
    .post(verifyUser,verifyCommunityAdmin,eventController.createEvents)
    .delete(verifyUser,verifyCommunityAdmin,eventController.deleteCurrentEvents)

router.route('/:cid/pastEvents')
    .get(eventController.getPastEvents)
    .delete(verifyUser,verifyCommunityAdmin,eventController.deletePastEvents)

router.route('/:cid/currentevents/:eid')
    .get(eventController.getCurrentEventById)
    .delete(verifyUser,verifyCommunityAdmin,eventController.deleteCurrentEventById);

router.route('/:cid/pastEvents/:eid')
    .get(eventController.getPastEventById)
    .delete(verifyUser,verifyCommunityAdmin,eventController.deletePastEventById);

module.exports = router;