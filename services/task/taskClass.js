const {isEmpty} = require('../../helpers/validation') 

class Task{
    constructor(userid, location, description, event, duration, subtask){
        this._userid = String(userid)
        this._location = location
        this._description = description 
        this._event = event 
        this._duration = duration
        this._subtask = subtask || []
    }

    get paramsTask(){
        return {
            userid : this._userid,
            location: this._location,
            description: this._description,
            event: this._event,
            duration: this._duration
        }
    }

    get paramsSubtask(){
        return this._subtask
    }

    // subtaskQuery(){
    //     let subtask = this._subtask
    //     if(subtask.length > 0 ){
    //         let queryStatement = `INSERT INTO SUBTASK (description, duration) VALUES \n`
       
    //         for(let i = 0 ; i < subtask.length ; i++){
    //             if(i == subtask.length - 1){
    //                 queryStatement += `('${subtask[i].description}', '${subtask[i].duration}');`
    //             }else{
    //                 queryStatement += `('${subtask[i].description}', '${subtask[i].duration}'), \n`
    //             }
    //         }

    //         return queryStatement
    //     }

    //     return subtask
    // }

    validateEmpty(){
        if(isEmpty(this._description) || isEmpty(this._userid) || isEmpty(this._event)){
            return true
        }
    }
} 

module.exports = Task