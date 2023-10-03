const { selectTopics } = require("../models/topics.model")


exports.fetchTopics = (req, res, next) => {
    selectTopics().then((topic) => {
        return res.status(200).send({topics: topic})

    })
}