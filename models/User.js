const {Schema, model} = require('mongoose') 

// create schema from class constructor Schema 
const schema = new Schema({
    email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true}
}) 


module.exports = model('User', schema)