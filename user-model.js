'use strict'
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    age: { type: Number },
    location: { type: String },
    img: { type: String },
    class: { type: Number }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
