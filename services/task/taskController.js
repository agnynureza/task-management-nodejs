const Task = require('./taskClass')
const TaskModel = require('./taskModel')
const {errorMessage, successMessage, status} = require('../../helpers/constant') 

/**
 * Create A Task
 * @param {object} req
 * @param {object} res
 * @returns {object} task object
 */

const createTask = async (req, res) => {
    let{location, description, event, duration, subtask, repeat} = req.body

    let {id} = req.user 
    let task = new Task(id, location, description, event, duration, subtask, repeat)

    task.validateLocation()
    task.validateEvent()
    task.validateDuration()

    if(task.validateEmpty()){
        errorMessage.error = 'Description or Event are missing';
        return res.status(status.bad).send(errorMessage);
    }


    let taskParams = task.paramsTask
    let subTaskPrams = task.paramsSubtask

    try{ 
        let getTask = await TaskModel.getTask(id, task._event)
        task.validationClashEvent(getTask)
      
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

    let task = new Task ()
    task.location = location
    task.event = time

    try{
        let dbResponse = await TaskModel.listTask(id, task._location, task._event)
        let repeatResponse = await TaskModel.repeatTask(id)
       
        repeatResponse = task.filterRepeatTask(repeatResponse, task._event) 
        dbResponse = [...dbResponse, ...repeatResponse]
        
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