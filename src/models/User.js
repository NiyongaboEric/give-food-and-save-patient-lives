const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    fullnName: { type: String, required: true },
    contact: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },  
    date: {type: Date, default: Date.now()}
});
let UserModel = mongoose.model('User', User);

module.exports = UserModel;