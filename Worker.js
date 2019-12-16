const mongoose = require('mongoose')
const connection = require('./db')

const workerSchema = mongoose.Schema({
    vkontakteId: String,
    answer: Number
})

const Worker = connection.model('Worker ', workerSchema)

module.exports = Worker