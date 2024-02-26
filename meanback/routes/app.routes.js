// var express = require('express');
// var router = express.Router();

const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/userControllers');

router.post('/register', ctrlUser.register);
router.post('/login', ctrlUser.login);
module.exports = router;