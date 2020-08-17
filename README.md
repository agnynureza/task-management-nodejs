# Task-Management With NodeJS

# Features!
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
| Key  | Value  | Data type |
| ----- | --------- | ----- |
| username | `agnynureza` | String |
| password | `123456`  | String |

Respon :
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
 
| Key  | Value  | Data Type |
| ---- | ------ |--------|
| username | `agnynureza` | String|
| password | `123456` | String |

Respon : 

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

3. POST ```/people-like-you/:id```
where id = ${data._id_from_create people} 

Headers:

| Key     | Value   |
| -------- | -------- |
| token | ${data.token_from_sigin} |
| accid | ${data.id_from_signin} |
| Content-type | application/x-www-form-urlencoded | 

body/payload:

| parameter  | type   |
| ----------- | ------- |
| name | String |
| age | Integer |
| etc |   | |

4.DELETE ```/people-like-you/:id```
where id = ${data._id_from_create people}

Headers:

| Key    | Value  | 
| ------- | ------- |
| token | ${data.token from sigin} |
| accid | ${data.id_from signin} |


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