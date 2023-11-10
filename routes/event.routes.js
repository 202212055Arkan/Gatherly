var express = require('express');
var router = express.Router();

const eventController = require('../controllers/event.controller');


router.route('/')
    .get()
    .post(eventController.createEvents,()=>{
        console.log(req.params.cid)
    })
    .put()
    .delete(eventController.deleteEvents)


module.exports = router;