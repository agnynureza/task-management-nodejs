const bcrypt = require('bcryptjs')
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config()


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
        process.env.SECRET, { expiresIn: '1h' });
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


/**
 * replaceTime helper method 
 * @param {string} input
 * @returns {array} 
*/
  
const replaceTime  = (input) => {
    let split = input.split('-')
    for(let i = 0 ; i < split.length ; i++){
        if(split[i].toLowerCase().includes('pm')){
            split[i] = split[i].toLowerCase().replace('pm', '')
            split[i] = Number(split[i].trim()) + 12
        } else {
            split[i] = split[i].toLowerCase().replace('am', '')
            split[i] = Number(split[i].trim())
        }
    }
    return split
}

/**
 * replace string helper method 
 * @param {string} input
 * @returns {object, integer} 
*/
  
const repeatValue = (repeat)=>{
    let value = 0
    switch(repeat.toLowerCase()){
        case 'every day':
        case 'every year':
        case 'every month':
            value = 1
            break
        case 'every week':
            value = 7 
            break
        default:
            value = 0 
            break
    }

    return value 
}

module.exports ={
    hashPassword,
    comparePassword,
    generateUserToken,
    isValidEmail,
    validatePassword,
    isEmpty,
    replaceTime,
    repeatValue
}
