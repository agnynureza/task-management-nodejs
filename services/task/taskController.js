const Task = require('./taskClass')
const TaskModel = require('./taskModel')
const {errorMessage, successMessage, status} = require('../../helpers/status') 

/**
 * Create A Task
 * @param {object} req
 * @param {object} res
 * @returns {object} task object
 */

const createTask = async (req, res) => {
    let{location, description, event, duration, subtask} = req.body
    let {id} = req.user 
    let task = new Task(id, location, description, event, duration, subtask)

    if(task.validateEmpty()){
        errorMessage.error = 'Description or Event are missing';
        return res.status(status.bad).send(errorMessage);
    }
    let taskParams = task.paramsTask
    let subTaskPrams = task.paramsSubtask

    try{ 
        let dbResponse = await TaskModel.insertAll(taskParams, subTaskPrams)
       
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    }catch(error){
        errorMessage.error = 'Operation was not successful';
        errorMessage.result = error
        return res.status(status.error).send(errorMessage);
    }
}

const getTask= async (req, res) => {
    let {time, location} = req.body
    let {id} = req.user

    let user = new Task ()
    user.location = location
    user.event = time

    try{
        let dbResponse = await TaskModel.listTask(id, user._location, user._event)
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    }catch(error){
        errorMessage.error = 'Operation was not successful';
        errorMessage.result = error
        return res.status(status.error).send(errorMessage);
    }
}

module.exports = {
    createTask,
    getTask
}