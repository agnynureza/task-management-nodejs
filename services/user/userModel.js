const dbQuery = require('../../db/dev/dbQuery')

class UsersModel{
    static async insertUserDB(username, hashedpassword){
        try{
            let queryStatement = `INSERT INTO users(username, password) VALUES($1, $2) returning *` 
            let values = [username, hashedpassword]
            let {rows} = await dbQuery.query(queryStatement, values)
            return rows[0]
        }catch(err){
            throw(err)
        }
    }

    static async getUserDB(username){
        try{
            let queryStatement = 'SELECT * FROM users WHERE username = $1'
            let values = [username]
            let {rows} = await dbQuery.query(queryStatement, values)
            return rows[0]
        }catch(err){
            throw(err)
        }
    
    }
}

module.exports = UsersModel