const bcrypt = require('bcryptjs')
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);



/**
 * Hash Password Method
 * @param {string} password
 * @returns {string} returns hashed password
 */

const hashPassword = (password) =>{
    return bcrypt.hashSync(password, salt);
} 

/**
 * comparePassword
 * @param {string} hashPassword
 * @param {string} password
 * @returns {Boolean} return True or False
 */
const comparePassword = (hashedPassword, password) => {
    return bcrypt.compareSync(password, hashedPassword);
};


/**
 * Generate Token
 * @param {string} id
 * @param {string} username
 * @param {string} password
 * @returns {string} token
 */
const generateUserToken = (id, username, password) => {
    const token = jwt.sign({
            id,
            username,
            password
        },
        env.secret, { expiresIn: '3d' });
    return token;
};

/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
*/

const isValidEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
};

  
/**
 * validatePassword helper method
 * @param {string} password
 * @returns {Boolean} True or False
 */
const validatePassword = (password) => {
    if (password.length <= 5 || password === '') {
        return false;
    } 
    return true;
};

/**
 * isEmpty helper method
 * @param {string, integer} input
 * @returns {Boolean} True or False
 */
const isEmpty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
    if (input.replace(/\s/g, '').length) {
        return false;
    } 
    return true;
};


  
module.exports ={
    hashPassword,
    comparePassword,
    generateUserToken,
    isValidEmail,
    validatePassword,
    isEmpty
}
