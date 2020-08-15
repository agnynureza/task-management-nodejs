const {isEmpty, validatePassword, hashPassword} = require('../../helpers/validation')

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
}

module.exports = User