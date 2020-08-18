const expect = require("chai").expect
const {taskMock} = require('../mock/mock')
const Task = require('../services/task/taskClass')
const task = new Task(1, 'campus', 'swimming', '2020-01-01', '2pm - 6pm', taskMock.subTask, 'every day' )
const {expectedEmpty, expectedLocation, expectedEvent, 
    expectedDuration, clashEventObj, expectedThrowErr,
    repeatObj} = taskMock
const moment = require('moment')

describe("Task Bussiness Logic class", function() {

    it("validation empty", function() {
        let isEmpty = task.validateEmpty()

        expect(isEmpty).to.eql(expectedEmpty);
    });
  
    it("validation location", function() {
        task._location = ""
        task._description = "go swimming at Community Centre 9am tomorrow"
        task.validateLocation()
        
        let location = task._location

        expect(location).to.eql(expectedLocation);
    });

    it("validation event", function() {
        task._event = ""
        task.validateEvent()
        
        let timeEvent = moment(task._event).format("YYYY-MM-DD")

        expect(timeEvent).to.eql(expectedEvent);
    });
 
    it("validation duration", function() {
        task._duration = ""
        task.validateDuration()
        
        let durationEvent = task._duration

        expect(durationEvent).to.eql(expectedDuration);
    });


    it("validation Clash Event", function() {
        let clashEvent = task.validationClashEvent(clashEventObj)
    
        expect(clashEvent).to.throw(Error, expectedThrowErr);
    });
 

    it("validation filter repeat task", function() {
        let repeatTask = task.filterRepeatTask(repeatObj, task._event)
        expect(repeatTask).to.eql(repeatObj);
    });
 });