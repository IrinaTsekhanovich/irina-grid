const mongoose = require('mongoose');
const connection = require('./db');

const userSchema = mongoose.Schema({
    vkontakteId: String,
    answer: Number
})

const User = connection.model('User', userSchema)

module.exports = User