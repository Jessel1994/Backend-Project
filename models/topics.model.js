const db = require('../db/connection')

exports.selectTopics = () => {
    return db.query(`SELECT * FROM topics`).then((result) => {
<<<<<<< HEAD
        
=======
    
>>>>>>> 3-get-api
        return result.rows
    })
}