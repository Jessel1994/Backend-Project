
const {selectAllUsers} = require('../models/users.model')

exports.fetchAllUsers = (req, res, next) => {
    selectAllUsers().then((users) => {
       
        res.status(200).send({users: users})
    })
}