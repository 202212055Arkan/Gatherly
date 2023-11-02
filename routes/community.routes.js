var express = require('express');
var router = express.Router();

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


module.exports = router;