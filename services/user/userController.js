const dbQuery = require('../../db/dev/dbQuery')
const {errorMessage, successMessage, status} = require('../../helpers/status')
const {comparePassword, generateUserToken, isEmpty} = require('../../helpers/validation')
const User = require('./userClass')

/**
 * Create A User
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
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

    //insert to database 
    let dbResponse = user.insertUserDB();
    if(dbResponse.error){
        if (dbResponse.routine === '_bt_check_unique') {
            errorMessage.error = 'User with that username already exist';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }

    delete dbResponse.password;
    let token = generateUserToken(dbResponse.id, dbResponse.username);

    successMessage.data = dbResponse;
    successMessage.data.token = token;
    return res.status(status.created).send(successMessage);
};

/**
 * Signin
 * @param {object} req
 * @param {object} res
 * @returns {object} user object
 */

const signInUser = async (req, res) => {
    let { username, password } = req.body;

    if (isEmpty(username) || isEmpty(password)) {
    errorMessage.error = 'Email or Password detail is missing';
    return res.status(status.bad).send(errorMessage);
    }

    let signinUserQuery = 'SELECT * FROM users WHERE username = $1';
    try {
        let { rows } = await dbQuery.query(signinUserQuery, [email]);
        let dbResponse = rows[0];
       
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