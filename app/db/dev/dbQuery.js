const pool = require("./pool")

/**
 *DB query 
 *@param {object} request 
 *@param {object} respon
 *@returns {object} object
*/

let query = (queryText, params) => {
    return new Promise((resolve, reject)=>{
        pool.query(queryText, params)
            .then(respon => {
                resolve(respon);
            })
            .catch(err => {
                reject(err);
            })
    })
}

module.exports = {query}