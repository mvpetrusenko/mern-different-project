// in node.js to add packages - global function require  
// library mongoose - to deal with npm install mongoose
// require instead of import 

// const express = require('express') 
// const config = require('config') 
// const mongoose = require('mongoose')




import express, { response } from 'express';
import jwt from 'jsonwebtoken'; 
import mongoose from 'mongoose'; 
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator' 

import { registrationValidation } from './validations/auth.js' 
import UserModel from './models/User.js' 
import checkAuth from './utils/checkAuth.js' 

import cors from 'cors' 


// then - check if connection to mongodb is real 
// after saving code in IDE console: You are connected to database 
// create user model (models/User.js)
mongoose.connect('mongodb+srv://mariia:test@cluster0.eu6w7.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0', 

).then(() => console.log('You are connected to database'))
.catch((error) => console.log('Not connected to database', error));

// app - server 
// creation of express application
const app = express() 

// for express to read json format: 
app.use(express.json()) 

app.use(cors());

// if on app get request comes on main route - function will be executed 
// function returns 2 parameters: request and response
app.get('/', (request, response) => {
    response.send('Everything has been received');
})


// to catch post request on address /login 
// to send from Insomnia (POST: http://localhost:5000/login) 
// in Insomnia response will be: {"success": true} 
// add to Insomnia request body data for authorization: {"email": "test@test.com", "password": "12345"} 
// when request comes - generate token and pass to token info to crypt (email, fullName...) 
// request.body.email - what user will send to us 
// to crypt info with special secret key 
// this token will be returned to the response to client 
// to decrypt this token - on website jwt.io and paste token to encoded section

// app.post('/login', (request, response) => { 
//     // in IDE console will be: {"email": "test@test.com", "password": "12345"} 
//     console.log(request.body); 

//     const token = jwt.sign({
//         email: request.body.email, 
//         fullName: 'Tom',
//     }, 'secret123', );

//     response.json({
//         success: true, 
//         token,
//     });
// }); 





// to login - find such user in database 
// in Insomnia: POST: http://localhost:5000/login with 
// body: {"email": "test@test.com", "password": "12345"} 
// response in Insomnia: {"_id": "67d580c6e1e4d09f02427edc", 
// "fullName": "Tom", "email": "test@test.com", 
// "createdAt": "2025-03-15T13:29:42.706Z", 
// "updatedAt": "2025-03-15T13:29:42.706Z", "__v": 0, "token": "eyJ"} 
// try to type in body wrong password: 
// {"message": "Invalid login or password"}
app.post('/login', async (request, response) => { 
    try {
        const user = await UserModel.findOne({ email: request.body.email }); 

        // if user not found stop furhter code with return
        if (!user) {
            return response.status(404).json({
                message: 'User not found'
            })
        } 

        const isValidPassword = await bcrypt.compare(request.body.password, user._doc.passwordHash); 

        // !! response.status(404) NOT REQUEST! because 
        // request does not have status method
        if (!isValidPassword) {
            return response.status(400).json({
                message: 'Invalid login or password'
            })
        } 

        const token = jwt.sign({
            _id: user._id
        }, 'secret123', 
        {
            expiresIn: '30d', 
        }
    );

    const { passwordHash, ...userData } = user._doc;

        response.json({
            ...userData,
            token,
        });

    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: 'Cannot log in',
        });
    }
}); 













// to validate data from client npm install express-validator 
// folder validations 
// first check registration data for validation, if ok - handle post request 
// before sending request via Insomnia, start server in IDE console: npm run server
// to send from Insomnia (POST: http://localhost:5000/registration) and 
// body: {"email": "test@test.com", "password": "12345", "fullName": "Tom"} 
// in Insomnia response will be: {"success": true} 
// if send Insomnia request with wrong email (testtest.com) - response 400 with message "Invalid value" 
// async - to use await 
app.post('/registration', registrationValidation, async (request, response) => { 
    try {
        // validationResult(request) - parse (get out) all from the request
        const errors = validationResult(request); 
        // if there are errors: 
        // return all errors - errors.array
        if(!errors.isEmpty()) {
            return response.status(400).json(errors.array());
        } 


        // crypt password from Insomnia request: 
        // generate salt (algorithm of crypt) 
        // hash - crypted password
        const password = request.body.password; 
        const salt = await bcrypt.genSalt(10); 
        const hash = await bcrypt.hash(password, salt);


        // prepare document for user registration: 
        // to email will be passed request.body.email 
        // in Insomnia password is passed like '1234' because frontend do not have to crypt password, but 
        // backend have to crypt password - npm install bcrypt
    
        const doc = new UserModel({
            email: request.body.email, 
            firstName: request.body.firstName,  
            passwordHash: hash, 
            // passwordHash: request.body.passwordHash, - before 
            // writing const passwordHash = await bcrypt.hash(password, salt);

        }); 


        // create user in mongodb: 
        // save document in database
        const user = await doc.save();


        // create token after successful registration: 
        // data to be crypt in token (id from response in Insomnia and mongodb compass) 
        // crypt id, because knowing id one can get all info about the user 
        // expiresIn - lifetime of token
        const token = jwt.sign({
            _id: user._id
        }, 'secret123', 
        {
            expiresIn: '30d', 
        }
    );

        // if there are NO errors: 
        // response.json({ - before writing const user = await doc.save();
        //     success: true, 
        // }); 
        // mongodb compass - gui for mongodb - connect using mongodb+srv (New connection - connect)


        // not show password from response: 
        // via destructure get passwordHash, but do not use it
        const { passwordHash, ...userData } = user._doc;



        // response.json(user); - before writing token expires 
        response.json({
            // ...user._doc, - with showing password in response 
            ...userData,
            token,
        });
    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: 'Cannot register',
        });
    }
}); 

// use JWT token (JSON web token library) to generate token while doing authorization 
// token to address to secured requests on our app 
// token helps to understand if user is authorized, create/delete articles ... 
// token is a key to access private info (from backend, database) 
// npm install jsonwebtoken and import it: import jwt from 'jsonwebtoken'; 



// check if can get info about oneself: 
// if this user using token can get info about his profile 
// folder utils/checkAuth.js 
// in Insomnia - GET: http://localhost:5000/auth/me 
// if checkAuth ok with next it pass to the further body (try-catch) 
// auth/me request tells if I am authorized or not 
// REST API (backend) CRUD (create (post), read (GET: /posts/:id) - id - dynamic parameter, update (edit), delete)
app.get('/auth/me', checkAuth, async (request, response) => {
    try { 
        // get user id and find in database string by id
        const user = await UserModel.findById(request.userId); 
        
        if (!user) {
            return response.status(404).json({
                message: 'User not found'
            });
        }
        const { passwordHash, ...userData } = user._doc;

        response.json(userData);
    } catch (error) {
        response.status(500).json({
            message: 'Do not have access',
        });
    }
});




// start app server - to which port connect app 
// error - if server cannot start
app.listen(5000, (error) => {
    if(error) {
        return console.log('error')
    } 
    console.log('Server has been started')
}); 

// run app server: node app.js - in IDE console will be: Server has been started 
// in web browser: http://localhost:5000/ - in web page will be: Everything received 

// not to start again server to see updated code - npm install nodemon 
// in package.json scripts: "server": "nodemon app.js"
// in the IDE console: npm run server 
// save code and refresh http://localhost:5000/ - new text will be seen (Everything has been received) 

// to send to the main root from Insomnia (GET: http://localhost:5000/): in 
// Insomnia response will be: Everything has been received











// // to get request body not undefined, but as json
// app.use(express.json({ extended: true }))

// // to register routes (from frontedn to backend)
// app.use('/api/auth', require('./routes/auth.routes'))

// // constant port to get port from config-default.json 
// // if port is not defined, default ( || ) port will be 5000 

// const PORT = config.get('port') || 5000 


// // method connect returns promise, to use syntax of async await wrap it with function 

// async function start() { 
//     try { 
//         // connect is promise; await - to wait while promise ends
//         await mongoose.connect(config.get('mongoUri'), {
//             // useNewURLParser: true, 
//             // useUnifiedTopology: true, 
//             // useCreateIndex: true - Server Error option usecreateindex is not supported 
//         }) 
//       app.listen(PORT, () => console.log(`App has been started on port ${PORT}`)) 
//     } catch (error) {
//         console.log('Server Error', error.message) 
//         // to exit from node.js process with global object process 
//         process.exit(1)
//     }
    
// }

// // call this function 

// start()



// method listen with parameters: port and callback ( () => )

// app.listen(5000, () => console.log('App has been started')) - before config-default.json file has been created

// app.listen(PORT, () => console.log(`App has been started on port ${PORT}`)) // use `` instead of ' ' with ${} variable 

