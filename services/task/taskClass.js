const {isEmpty} = require('../../helpers/validation') 
const {locationFilter, timeFilter, eventFilter, daysNumb} = require('../../helpers/constant')
const moment = require('moment')
const {replaceTime} = require('../../helpers/validation')


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
            duration: this._duration,
            repeat: this._repeat
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
            day == 'Invalid Date' ? day = moment(new Date ()).format("YYYY-MM-DD") : ''
            this._event = day
        }
    }

    validateDuration(){
        if(this._duration == ""){
            let rgx = new RegExp(timeFilter, "gi")
            let description = this._description
            let filter = description.match(rgx)
            
            if(filter.length < 1){
                throw "you must fill duration event"
            }

            this._duration = filter[0]
        }
    }

    validationClashEvent(task){
        for(let i = 0 ; i < task.length ; i++){
            let today = new Date()
            let repeat_event = task[i]['repeat_type']
            let timeEvent = task[i]['time event']
            let repeat_value = task[i]['repeat_value']

            if(repeat_event == 'every day' || repeat_event == 'every week'){
                timeEvent = new Date.setDate((new Date(timeEvent).getDate() + repeat_value))  
            }else if(repeat_event == 'every month'){
                timeEvent = new Date.setMonth((new Date(timeEvent).getMonth() + repeat_value))  
            }
        
            if( moment(this._event).format("YYYY-MM-DD") == moment(timeEvent).format("YYYY-MM-DD")){
                let currentPlan = replaceTime(task[i]['sub duration'])
                let futurePlan = replaceTime(this._duration)
                
                //have duration
                if(currentPlan.length > 1){
                    if(futurePlan[0] >= currentPlan[0] && futurePlan[0] <= currentPlan[1]){
                        throw `you already have schedule at that time : ${this._event} ${this._duration} `
                    }
                }else{
                    if(currentPlan[0] == futurePlan[0]){
                        throw `you already have schedule at that time : ${this._event} ${this._duration} `
                    }
                }
            }
        }
    }
    
} 

module.exports = Task