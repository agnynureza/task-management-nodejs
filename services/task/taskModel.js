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
        let subtask= [0]
        try{
            await pool.query('BEGIN')
            let respTask = await this.insertTaskDB(paramstask)

            if(subTaskParams.length > 0){
                let respSubTask = await this.insertSubTaskDB(subTaskParams)
                subtask = respSubTask
            }
            await this.insertRelationTaskDB(respTask.id, subtask)
            await pool.query('COMMIT')
            return `Suceess Insert task id : ${respTask.id} `
        }catch(error){
            await pool.query('ROLLBACK')
            throw(error)
        }
    }

    static async listTask(userid, location, time){
        try{
            let queryStatement =`SELECT t.userid, t.location, t.description as "main task",
                      t.event as "time event", t.duration, t. status, 
                      st.description as "sub task", st.duration "sub duration", td.status "sub status"
                      FROM task AS t 
                      JOIN taskdetail AS td ON t.id = td.taskid
                      JOIN subtask AS st ON st.id = td.subtaskid
                    WHERE
                      userid = $1 
                      AND	
                      (location ILIKE $2 OR event = $3);` 
            let values = [userid, `%${location}%`, time]
            let {rows} = await dbQuery.query(queryStatement,values)
            return rows
        }catch(err){
            throw(err)
        } 
    }

    static async getTask (userid, time){
        try {
            let queryStatement = `SELECT t.userid, t.location, t.description AS "main task",
                  t.event AS "time event", t.duration AS "main duration" , t. status, tr.repeat_type,
                  tr.repeat_value, st.description AS "sub task", st.duration "sub duration"
                  FROM task AS t 
                  JOIN taskdetail AS td ON t.id = td.taskid
                  JOIN subtask AS st ON st.id = td.subtaskid
                  LEFT JOIN taskrepeat AS tr ON td.id = tr.taskdetailid
                WHERE 
                  userid = $1 
                    AND 
                  t.event = $2;`

            let values = [userid, time]
            let {rows} = await dbQuery.query(queryStatement,values)
            return rows
        }catch(err){
            throw(err)
        }
    }
    
}

module.exports = TaskModel 
