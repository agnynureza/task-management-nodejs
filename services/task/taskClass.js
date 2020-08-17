const {isEmpty} = require('../../helpers/validation') 
const {locationFilter, timeFilter, eventFilter, daysNumb} = require('../../helpers/constant')
const moment = require('moment')
const {replaceString} = require('../../helpers/validation')


class Task{
    constructor(userid, location, description, event, duration, subtask, repeat){
        this._userid = String(userid)
        this._description = description || ""
        this._location = location || ""
        this._event = event || ""
        this._duration = duration || ""
        this._subtask = subtask || [] 
        this._repeat = repeat || ""
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

    validateLocation(){
        if(this._location == ""){
            let rgx = new RegExp(locationFilter, "gi")
    
            let description = this._description
            let index = description.indexOf('at')
            let filter = description.slice(index)
    
            filter = filter.replace(rgx, "")
            this._location = filter.trim()
        }
    }

    validateEvent(){
        if(this._event == ""){
            let rgx = new RegExp(eventFilter, "gi")
            let description = this._description
            let filter = description.match(rgx)
            let day = filter[0]
            
            let date = new Date()
    
            switch(day.toLowerCase()){
                case 'tomorrow':
                    day = new Date(date.setDate(date.getDate() + 1)).toDateString()
                    break
                case 'next week':
                    day = new Date(date.setDate(date.getDate() + 7)).toDateString()
                    break
                case 'next month':
                    day = new Date(date.setMonth(date.setMonth() + 1)).toDateString()
                    break
                default:
                    let today = date.getDay() == 0 ? date.getDay() + 7 : date.getDay()
                    let add = daysNumb[day] - today
                    day = new Date(date.setDate(date.getDate() + add)).toDateString()
                    break
            }
            this._event = day
        }
    }

    validateDuration(){
        if(this._duration == ""){
            let rgx = new RegExp(timeFilter, "gi")
            let description = this._description
            let filter = description.match(rgx)
    
            this._duration = filter[0]
        }
    }

    validationClashEvent(task){
        // console.log(task)
        // console.log(this._duration)
        // console.log(this._event)
        for(let i = 0 ; i < task.length ; i++){
            let repeat_event = task[i]['repeat_type']
            let timeEvent = task[i]['time event']
            let repeat_value = task[i]['repeat_value']

            if(repeat_event == 'every day' || repeat_event == 'every week'){
                timeEvent = new Date.setDate((new Date(timeEvent).getDate() + repeat_value))  
            }else if(repeat_event == 'every month'){
                timeEvent = new Date.setMonth((new Date(timeEvent).getMonth() + repeat_value))  
            }
        
            console.log(task[i])
            console.log(this._duration)
            if( moment(this._event).format("YYYY-MM-DD") == moment(timeEvent).format("YYYY-MM-DD")){
                console.log(replaceString(task[i]['sub duration']))
            }
        }
    }
    
} 

module.exports = Task