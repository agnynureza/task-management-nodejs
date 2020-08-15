const dbQuery = require('../../db/dev/dbQuery')

class UsersModel{
    static async insertUser(username, hashedpassword){
        try{
            let queryStatement = `INSERT INTO users(username, password) VALUES($1, $2) returning *` 
            let values = [username, hashedpassword]
            let {rows} = await dbQuery.query(queryStatement, values)
            return rows[0]
        }catch(err){
            err.error = true
            return err
        }
    }
}

module.exports = UsersModel