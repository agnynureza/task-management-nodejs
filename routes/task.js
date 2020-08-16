const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyAuth')
const {createTask, getTask} = require('../services/task/taskController')


router.post('/', verifyToken, createTask);
router.post('/list', verifyToken, getTask);


module.exports = router;
