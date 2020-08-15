const {isEmpty, validatePassword, hashPassword} = require('../../helpers/validation')
const userModel = require('./userModel')

class User {
    constructor(username, password){
        this._username = username 
        this._password = password
        this._hashedPassword;
    }

    validateEmpty(){
        if(isEmpty(this._username) || isEmpty(this._password)){
            return true
        }
    }

    validatePassword(){
        return validatePassword(this._password)
    }

    hashedpassword(){
        this._hashedPassword = hashPassword(this._password)
    }

    insertUserDB(){
        let dbResponse = userModel.insertUser(this._username, this._hashedPassword)
        return dbResponse 
    }
}

module.exports = User