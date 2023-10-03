const {showEndpoints} = require('../models/api.model')

exports.fetchAPI = (req, res, next) => {
    return showEndpoints().then((endpoints) => {
        res.status(200).send({endpoints: endpoints})

    })
}