const pool = require('./pool');

pool.on("connect", ()=>{
    console.log("connected to the db");
})

/**
 *Create user table 
 */

const createUserTable = () => {
    const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
    (id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at DATE NOT NULL DEFAULT NOW(),
    updated_at DATE NOT NULL DEFAULT NOW())`;

    pool.query(userCreateQuery)
        .then(res => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        })
};

/**
 * Create task table
*/

const createTaskTable = () => {
    const taskCreateQuery = `CREATE TABLE IF NOT EXISTS task
        (id SERIAL PRIMARY KEY,
        userid INTEGER NOT NULL,
        location VARCHAR(100),
        description TEXT NOT NULL,
        event TIMESTAMP NOT NULL,
        duration VARCHAR(100),
        status BOOLEAN NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW())`;
  
    pool.query(taskCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        })
}

/**
 * Create subtask table 
*/

const createSubTaskTable = () => {
    const subTaskCreateQuery = `CREATE TABLE IF NOT EXISTS subtask
        (id SERIAL PRIMARY KEY,
        description TEXT NOT NULL,
        duration VARCHAR(100) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW())`;
  
    pool.query(subTaskCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        })
}

/**
 * Create task detail  
*/
const createTaskDetailTable = () => {
    const taskDetailCreateQuery = `CREATE TABLE IF NOT EXISTS taskdetail
        (id SERIAL PRIMARY KEY,
        taskid INTEGER REFERENCES task(id) ON DELETE CASCADE, 
        subtaskid INTEGER REFERENCES subtask(id) ON DELETE CASCADE,
        status BOOLEAN NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW())`;
  
    pool.query(taskDetailCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        })
}

/**
 * Create repeat task table
*/

const createRepeatTaskTable = () => {
    const repeatTaskCreateQuery = `CREATE TABLE IF NOT EXISTS taskrepeat
        (id SERIAL PRIMARY KEY,
        taskdetailid INTEGER REFERENCES taskdetail(id) ON DELETE CASCADE,
        repeat_type VARCHAR(100),
        repeat_value INTEGER,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW())`;
  
    pool.query(repeatTaskCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        })
}

/**
 * Create All Tables 
*/
const createAllTables = () => {
    createUserTable();
    createTaskTable();
    createSubTaskTable();
    createTaskDetailTable();
    createRepeatTaskTable();
} 

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });


  createAllTables()
