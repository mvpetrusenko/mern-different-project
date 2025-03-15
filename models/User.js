import mongoose from "mongoose"; 


// create scheme of table  
// imageUrl: String (without object if parameter is not required, optional) 
// timestamps - data of user creation 
// export default mongoose.model('User', UserScheme) - model name User with scheme UserScheme 
// mvc - model view controller
const UserScheme = new mongoose.Schema({
    fullName: {
        type: String, 
        required: true,
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true, 
    }, 
    passwordHash: {
        type: String, 
        required: true, 
    },
}, {
    timestamps: true, 

});




export default mongoose.model('User', UserScheme)













// const {Schema, model} = require('mongoose') 

// // create schema from class constructor Schema 
// const schema = new Schema({
//     email: {type: String, required: true, unique: true}, 
//     password: {type: String, required: true}
// }) 


// module.exports = model('User', schema)