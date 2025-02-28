// in node.js to add packages - global function require 

const express = require('express') 
const config = require('config') 
const mongoose = require('mongoose')

// app - server 

const app = express('/api/auth', require('./routes/auth.routes')) 

// to register routes (from frontedn to backend)
app.use()

// constant port to get port from config-default.json 
// if port is not defined, default ( || ) port will be 5000 

const PORT = config.get('port') || 5000 


// method connect returns promise, to use syntax of async await wrap it with function 

async function start() { 
    try { 
        // connect is promise; await - to wait while promise ends
        await mongoose.connect(config.get('mongoUri'), {
            // useNewURLParser: true, 
            // useUnifiedTopology: true, 
            // useCreateIndex: true - Server Error option usecreateindex is not supported 
        }) 
      app.listen(PORT, () => console.log(`App has been started on port ${PORT}`)) 
    } catch (error) {
        console.log('Server Error', error.message) 
        // to exit from node.js process with global object process 
        process.exit(1)
    }
    
}

// call this function 

start()



// method listen with parameters: port and callback ( () => )

// app.listen(5000, () => console.log('App has been started')) - before config-default.json file has been created

// app.listen(PORT, () => console.log(`App has been started on port ${PORT}`)) // use `` instead of ' ' with ${} variable 

