const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controllers');

// Retrieve all users
router.get('/', userController.all);

// Create a new user
router.post('/', userController.create);

// Retrieve a single user with id
router.get('/:email', userController.getOne);

// Update a user with id
router.put('/:email', userController.update);

// Delete a user with id
router.delete('/:email', userController.delete);


module.exports = router