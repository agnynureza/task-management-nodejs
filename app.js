const express = require('express');
const logger = require('morgan');
const cors = require('cors')
const usersRouter = require('./routes/users');
const app = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', usersRouter);
//app.use('/task', taskRouter)

module.exports = app;
