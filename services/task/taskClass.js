const {isEmpty} = require('../../helpers/validation') 
const {locationFilter, timeFilter, eventFilter} = require('../../helpers/constant')

class Task{
    constructor(userid, location, description, event, duration, subtask){
        this._userid = String(userid)
        this._description = description 
        this._location = location
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
        console.log(this._event)
        console.log(this._location)
        console.log(this._duration)
        if(isEmpty(this._description) || isEmpty(this._userid) || isEmpty(this._event)){
            return true
        }
    }

    validateLocation(){
        let rgx = new RegExp(locationFilter, "gi")
    
        let description = this._description
        let index = description.indexOf('at')
        let filter = description.slice(index)

        filter = filter.replace(rgx, "")
        this._location = filter.trim()
    }

    validateEvent(){
        let rgx = new RegExp(eventFilter, "gi")
        let description = this._description
        let filter = description.match(rgx)

        this._event = filter[0]
    }

    validateDuration(){
        let rgx = new RegExp(timeFilter, "gi")
        let description = this._description
        let filter = description.match(rgx)

        this._duration = filter[0]
    }
} 

module.exports = Task