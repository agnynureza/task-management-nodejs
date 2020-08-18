const Task = require('../services/task/taskClass')

module.exports = {
    validationHelper :{
        timeDurationPM:'2pm-4pm',
        timeDurationAM:'2am-4am',
        expectedDurationPM:[14,16],
        expectedDurationAM:[2,4] ,
        everyday: 'every day',
        everyweek: 'every week',
        expectedDay: 1,
        expectedWeek: 7
    },
    taskMock: {
        subTask : [{
            duration: '2pm - 4pm',
            description: 'final exam'
        },
        {
            duration: '4pm - 6pm',
            description: 'exam'
        }],
        expectedEmpty: false,
        expectedLocation: "Community Centre",
        expectedEvent : "2020-08-19",
        expectedDuration: "9am",
        clashEventObj: [{
            'time event': "2020-08-19",
            'sub duration': "9am"
        }],
        expectedThrowErr: "you already have schedule at that time : 2020-08-19 9am",
        repeatObj: [
            {
                "location": "Home",
                "description": "WFH",
                "event": "2020-08-20T17:00:00.000Z",
                "repeat_type": "every day",
                "repeat_value": 1
            }
        ]
    }
    
}