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

1. GET ```/user/signup```


![Signin](images/signin.png)


Headers: 
```Bambulife accid=5c2def59b72e1f1568182341```

| Key  | Value  | 
| ----- | --------- |
| token | ${data.token_from_sigin} |
| accid | ${data.id_from_signin}  | 

Params:

| Key | Value | info   |
| ---- | ------ | ------- |
| age| 20 | optional |
| score| 0.8 | optional |
| longitude | 43.23 | optional |
| latitude | 34.432 | optional |
| monthlyIncome| 4352 | optional |
| experienced | true | optional |

2.POST ```/people-like-you```

Headers:  

```Bambulife accid=5c2def59b72e1f1568182341```

| Key  | Value  |
| ---- | ------ |
| token | ${data.token_from_sigin} |
| accid | ${data.id_from_signin}
| Content-type | application/x-www-form-urlencoded |

Body/payload: 

| parameter  | type   |
| ----------- | ------- |
| name | String |
| age |Integer |
| longitude | String |
| latitude | String |
| monthlyIncome | Integer |
| experienced | Boolean |
| score | Integer |

3.PUT ```/people-like-you/:id```
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