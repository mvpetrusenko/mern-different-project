const {Router} = require('express')  
const bcrypt = require('bcryptjs') 
const {check, validationResult} = require('express-validator')
const User = require('../models/User')

const router = Router() 

// endpoints register and login: 
// it will be added to /api/auth = /api/auth/register 
// arrow async function, which receives parameters: request and response 
// response with status error code 500 - server error 

// email, password - what will be send from frontend 

router.post('/register', 
    [
        check('email', 'Invalid email').isEmail(), 
        check('password', 'Minimum password length - 6 symbols').isLength({ min: 6 })
    ],
    async (request, response) => {
    try { 

        const errors = validationResult(request) 

        // if object !errors is NOT (!) empty = there are some errors - return error on frontend
        if(!errors.isEmpty()) {
            return response.status(400).json({ 
                // make array of object errors
                errors: errors.array(), 
                message: 'Invalid registration data'
            })
        }
        
        // receive fields from request body 
        const {email, password} = request.body() 

        // check, if such email already exists 
        // { email: email } or { email} if in object email key and value are the same
        const candidate = await User.findOne({ email: email }) 

        // return - for script not to go further 
        if(candidate) {
            return response.status(400).json({ message: 'Such user already exists' })
        }

        // register new user: 
        // to hash (crypt) password and compare passwords use library bcrypt.js 
        // npm i bcryptjs 
        // 12 - salt to more crypt password 
        // await - because bcrypt.hash(password, 12) is async
        const hashedPassword = await bcrypt.hash(password, 12) 
        const user = new User({ email, password: hashedPassword } ) 

        await user.save() 

        response.status(201).json({ message: 'User has been created' }) 

        // install express-validator to validate data in backend 
        // npm i express-validator


    } catch (e) {
        response.status(500).json({ message: 'Something went wrong. Try again' })
    }
})


// /api/auth/login
router.post('/login', async (request, response) => {
    try {
        dd
    } catch (e) {
        dd
    }
})


module.exports = router 

