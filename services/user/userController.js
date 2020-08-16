const {errorMessage, successMessage, status} = require('../../helpers/status')
const {comparePassword, generateUserToken, isEmpty} = require('../../helpers/validation')
const User = require('./userClass')
const UserModel = require('./userModel')

/**
 * Create A User
 * @param {object} req
 * @param {object} res
 * @returns {object} user object
 */

const signUpUser = async (req, res) => {
    let { username, password} = req.body;
    let user = new User(username, password)

    if (user.validateEmpty()) {
        errorMessage.error = 'username and password cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    if (!user.validatePassword()) {
        errorMessage.error = 'Password must be more than five(5) characters';
        return res.status(status.bad).send(errorMessage);
    }

    //set hashed password
    user.hashedpassword();

    try{
        let dbResponse = await UserModel.insertUserDB(user._username, user._hashedPassword);
        delete dbResponse.password;
        let token = generateUserToken(dbResponse.id, dbResponse.username);

        successMessage.data = dbResponse;
        successMessage.data.token = token;
        return res.status(status.created).send(successMessage);
    }catch(error){
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'User with that username already exist';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
}
/**
 * Signin
 * @param {object} req
 * @param {object} res
 * @returns {object} user object
 */

const signInUser = async (req, res) => {
    let { username, password } = req.body;
    let user = new User(username, password)
    
    if(user.validateEmpty()){
        errorMessage.error = 'Email or Password detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    try {
        let dbResponse = await UserModel.getUserDB(username);
         
        if (!dbResponse) {
            errorMessage.error = 'User with this username does not exist';
            return res.status(status.notfound).send(errorMessage);
        }

        if (!comparePassword(dbResponse.password, password)) {
            errorMessage.error = 'The password you provided is incorrect';
            return res.status(status.bad).send(errorMessage);
        }

        let token = generateUserToken(dbResponse.id, dbResponse.username);
        delete dbResponse.password;
        
        successMessage.data = dbResponse;
        successMessage.data.token = token;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};

module.exports = {
  signInUser,
  signUpUser
};