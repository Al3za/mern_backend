const express = require('express');
const { get } = require('mongoose');
const { route } = require('./root');
const userController = require('../controllers/usersController')
const router = express.Router();

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createNewUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router;