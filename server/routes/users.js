var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const { upload} = require('../../middleware/middleware')

router.route('/signup').get(userController.getSignUpPage)
                      .post(upload.single('profilepicture'),userController.addUser)

module.exports = router;
