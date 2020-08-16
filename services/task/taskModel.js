const dbQuery = require('../../db/dev/dbQuery')
const pool = require('../../db/dev/pool')
const format = require('pg-format')


class TaskModel {
    static async insertTaskDB(params){
        try{
            let queryStatement = `INSERT INTO TASK(userid, location, description, event, duration, status) VALUES 
            ($1, $2, $3, $4, $5, false) returning id`
            let values = [params.userid, params.location, params.description, params.event, params.duration]
            let {rows} = await dbQuery.query(queryStatement, values)
            return rows[0]
        }catch(err){
            throw(err)
        } 
    }

    static async insertSubTaskDB(params){
        try{
            let queryStatement = format(`INSERT INTO SUBTASK (description, duration) VALUES %L returning id`, params)
            let {rows} = await dbQuery.query(queryStatement)
            return rows
        }catch(err){
            console.log(err)
            throw(err)
        } 
    }

    static async insertRelationTaskDB(taskId, subTaskId){
        let params = []
        for(let i = 0 ; i < subTaskId.length ; i ++){
            params.push([taskId, subTaskId[i].id, false])
        }

        let queryStatement = format(`INSERT INTO TASKDETAIL(taskid, subtaskid, status) VALUES %L`, params)
        try{
            let {rows} = await dbQuery.query(queryStatement)
            return rows[0]
        }catch(err){
            throw(err)
        } 
    }

    static async insertAll(paramstask, subTaskParams){
        try{
            await pool.query('BEGIN')
            let respTask = await this.insertTaskDB(paramstask)

            if(subTaskParams.length > 0){
                let respSubTask = await this.insertSubTaskDB(subTaskParams)
                await this.insertRelationTaskDB(respTask.id, respSubTask)
            }
            await pool.query('COMMIT')
            return `Suceess Insert task id : ${respTask.id} `
        }catch(error){
            await pool.query('ROLLBACK')
            throw(error)
        }
      
    }
    
}

module.exports = TaskModel 
