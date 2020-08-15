const moment = require('moment')
const dbQuery = require('../../db/dev/dbQuery')
const {errorMessage, successMessage, status} = require('../../helpers/status')
const {hashPassword,comparePassword, generateUserToken, 
    isValidEmail, validatePassword, isEmpty} = require('../../helpers/validation')

/**
 * Create A User
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */

const signUp = async (req, res) => {
    let { username, password} = req.body;

    if (isEmpty(email) || isEmpty(first_name) || isEmpty(last_name) || isEmpty(password)) {
        errorMessage.error = 'username and password cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    if (!validatePassword(password)) {
        errorMessage.error = 'Password must be more than five(5) characters';
        return res.status(status.bad).send(errorMessage);
    }

    let hashedPassword = hashPassword(password);
    let createUserQuery = `INSERT INTO users(username, password)
        VALUES($1, $2)
        returning *`;
    let values = [ username, hashedPassword];

    try {
        let { rows } = await dbQuery.query(createUserQuery, values);
        let dbResponse = rows[0];
        delete dbResponse.password;
        let token = generateUserToken(dbResponse.id, dbResponse.username, dbResponse.is_admin);

        successMessage.data = dbResponse;
        successMessage.data.token = token;

        return res.status(status.created).send(successMessage);
    } catch (error) {
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'User with that EMAIL already exist';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};

/**
 * Signin
 * @param {object} req
 * @param {object} res
 * @returns {object} user object
 */

const signIn = async (req, res) => {
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
  signUp,
  signIn
};