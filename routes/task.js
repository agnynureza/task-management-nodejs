const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyAuth')
const {createTask} = require('../services/task/taskController')


router.post('/', verifyToken, createTask);


module.exports = router;
