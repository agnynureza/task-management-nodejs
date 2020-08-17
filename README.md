# Task-Management With NodeJS

### DB Schema 

![Database](images/DBSchema.png)

### Project Schema 

main bisnis i put in services grouping per modules

![Project](images/projectSchema.png)


### Features!
  - User can add subtask
  - verify authentication user  
  - Api for list all task (userid) queried by time or location 
  - Api for Sign up and Sign in
  - User can add task only by single string (1 object payload)
  - Api can detect wheter task clashed with another task
  - User can add recurring task   

### Installation
With npm:

```
$npm install
$npm run setup -> for create table
$npm start

```
for testing :
```
$npm test
```
 
### REST API 
#### List of routes :
| Route          | HTTP   |            Description              |
|----------------|--------|-------------------------------------|
| `/user/signin` | POST   | Sign in Account                     |
| `/user/signup` | POST   | Create New Account                  |
| `/task`        | POST   | Create task                         |
| `/task/list`   | GET    | List all task based on userid       |


Access API via ```http://localhost:3000```

### Basic usage:
you can use postman or insomnia for API testing :


1. POST ```/user/signup```

![Signup](images/signup.png) 

Body :

```
{
    "username": "agnynureza",
    "password": "123456"
}
```


Response :
```
{
    "status": "success",
    "data": {
        "id": 4,
        "username": "agnynureza",
        "created_at": "2020-08-17T17:00:00.000Z",
        "updated_at": "2020-08-17T17:00:00.000Z",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJhZ255bnVyZXphIiwiaWF0IjoxNTk3NjkxOTQ1LCJleHAiOjE1OTc2OTU1NDV9.0mC2RvO71PubPwv35wGOwXKAVAduBJkgPq5nzYOG4U4"
    }
}
```


2. POST ```/user/signin```

![Signin](images/signin.png) 

Body:
 
```
{
    "username": "agnynureza",
    "password": "123456"
}
```

Response : 

```
{
    "status": "success",
    "data": {
        "id": 4,
        "username": "agnynureza",
        "created_at": "2020-08-17T17:00:00.000Z",
        "updated_at": "2020-08-17T17:00:00.000Z",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJhZ255bnVyZXphIiwiaWF0IjoxNTk3NjkyNDExLCJleHAiOjE1OTc2OTYwMTF9.iNlCqiaHcHAEBcnqvNinfpDDv2ferSta8QCQ2mhzt5I"
    }
}    
```


3. POST ```/task```

Headers:

| Key     | Value   | Data Type |
| -------- | -------- | ------ |
| token |`token from sigin or signup`| String |

#### User Can add subtask

Main Task and Sub Task

![task](projectSchema)

Body:

```
{
    "location": "university",
    "description": "Final Exam",
    "subtask" : [
        ["mathematic exam", "2pm-4pm"],
        ["physic exam", "4pm-6pm"]
        ],
    "event": "2020-08-17",
    "duration":"2pm-6pm "
}
```

Response :

```
{
    "status": "success",
    "data": "Suceess Insert task id : 92 "
}
```

Token Expired (1H) need to login again get new token:

![TokenExpired](images/tokenexpired.png )



#### Add task with Single String
Body :

```
{
    "description": "go swimming at Community Centre 9am tomorrow"
}
```

Response :

```
{
    "status": "success",
    "data": "Suceess Insert task id : 93 "
}
```
 we can extract data and fill , location , duration and time event (tomorrow <today + 1>)

 ![singleString](images/)


### Api add task will give error if user already schedule that time (limited with fix task not repeated)
as we know we already add task ```2020-08-17 at 2pm - 6pm```
Body : 
```
{
    "location": "university",
    "description": "Final Exam",
    "event": "2020-08-17",
    "duration":"3pm "
}
```

Response : 

```
{
    "status": "error",
    "error": "Operation was not successful",
    "result": "you already have schedule at that time : 2020-08-17 3pm  "
}
```

### Api Can Add recurring Task (only can add with normal form)

Body: 
```
{
    "location": "university",
    "description": "Final Exam",
    "event": "2020-08-20",
    "duration":"3pm",
    "repeat": "every day"
}
```

Response:
```
{
    "status": "success",
    "data": "Suceess Insert task id : 95 "
}
```

4. GET ```/task/list```


Headers:

| Key     | Value   | Data Type |
| -------- | -------- | ------ |
| token |`token from sigin or signup`| String |

### show all task list query time 

1. give list task and subtask too
2. if user only have task will show main task 
3. if user have subtask will show all subtask related
-
Body :

```
{
    "location": "university",
    "time": ""
}
```

Response: 

```
{
    "status": "success",
    "data": [
        {
            "userid": 4,
            "location": "university",
            "main task": "Final Exam",
            "time event": "2020-08-16T17:00:00.000Z",
            "duration": "2pm-6pm ",
            "status": false,
            "sub task": "mathematic exam",
            "sub duration": "2pm-4pm",
            "sub status": false
        },
        {
            "userid": 4,
            "location": "university",
            "main task": "Final Exam",
            "time event": "2020-08-16T17:00:00.000Z",
            "duration": "2pm-6pm ",
            "status": false,
            "sub task": "physic exam",
            "sub duration": "4pm-6pm",
            "sub status": false
        }
    ]
}
```

### show all task list with repeated task

Remember when i insert repeated event 
```
{
    "location": "university",
    "description": "Final Exam",
    "event": "2020-08-20",
    "duration":"3pm",
    "repeat": "every day"
}
```

i will call it with time : 2020-09-20

Body:
```
{
     "location": "",
    "time": "2020-09-20"
}
```

Response:
```
{
    
}
```





### Tech
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [Postgres] - the streaming build system
* [Mocha] - test run
* [JsonWebToken] - Authorization and Authentication 
* [Redis] - Session Cache
* [Github] - Version Control


[node.js]: <http://nodejs.org>
[Mocha]: <https://mochajs.org/>
[Postgres]: <https://node-postgres.com//>
[JsonWebToken]: <https://jwt.io/>
[Express]: <http://expressjs.com>
[Redis]: <https://redis.io/>
[Github]: <https://github.com/agnynureza/task-management-nodejs/>