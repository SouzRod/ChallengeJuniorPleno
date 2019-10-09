const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    address: {type: String, required: true, unique: true, lowercase: true},
    city: {type: String, required: true, unique: true, lowercase: true},
    state: {type: String, required: true, unique: true, lowercase: true},
    createdAt: { type: Date, default: Date.now}

})

module.exports = mongoose.model('User', userSchema);