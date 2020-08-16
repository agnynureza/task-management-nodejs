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
    
    set location(location){
        this._location = location || ''
    }

    set event(time){
        this._event = time || 'now()'
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

    validateEmpty(){
        if(isEmpty(this._description) || isEmpty(this._userid) || isEmpty(this._event)){
            return true
        }
    }
} 

module.exports = Task