// in node.js to add packages - global function require  
// library mongoose - to deal with npm install mongoose
// require instead of import 

// const express = require('express') 
// const config = require('config') 
// const mongoose = require('mongoose')




import express from 'express';
import jwt from 'jsonwebtoken'; 
import mongoose from 'mongoose'; 

// then - check if connection to mongodb is real 
// after saving code in IDE console: You are connected to database 
// create user model (models/User.js)
mongoose.connect('mongodb+srv://mariia:test@cluster0.eu6w7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', 

).then(() => console.log('You are connected to database'))
.catch((error) => console.log('Not connected to database', error));

// app - server 
// creation of express application
const app = express() 

// for express to read json format: 
app.use(express.json())

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

app.post('/login', (request, response) => { 
    // in IDE console will be: {"email": "test@test.com", "password": "12345"} 
    console.log(request.body); 

    const token = jwt.sign({
        email: request.body.email, 
        fullName: 'Tom',
    }, 'secret123', );

    response.json({
        success: true, 
        token,
    });
}); 


// use JWT token (JSON web token library) to generate token while doing authorization 
// token to address to secured requests on our app 
// token helps to understand if user is authorized, create/delete articles ... 
// token is a key to access private info (from backend, database) 
// npm install jsonwebtoken and import it: import jwt from 'jsonwebtoken'; 



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

