var express = require('express');
var router = express.Router();



const userController = require('../controllers/user.controller');

router.post('/signup',userController.signup);
router.post('/login',userController.login);
router.put('/edit-profile',userController.editProfile);

router.route('/events')
    .get(userController.getCurrentEventsInUser)
    .post(userController.addCurrentEventInUser)



/* GET users listing. */
router.get('/', userController.getAllUsers);

module.exports = router;
