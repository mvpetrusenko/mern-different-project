const {Router} = require('express')  
const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken') 
const config = require('config')
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
        // findOne - to find only one user by email 
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
router.post('/login', 
    [
        check('email', 'Enter valid email').normalizeEmail().isEmail(), 
        check('password', 'Enter email').exists()
    ],
    async (request, response) => {
        try { 

            const errors = validationResult(request) 
    
            // if object !errors is NOT (!) empty = there are some errors - return error on frontend
            if(!errors.isEmpty()) {
                return response.status(400).json({ 
                    // make array of object errors
                    errors: errors.array(), 
                    message: 'Invalid login data'
                })
            } 

            const {email, password} = request.body() 

            const user = await User.findOne({ email }) 

            // if there is no such user
            if(!user) {
                return response.status(400).json({ message: 'User not found' })
            }

            // password - which from frontend, user.password - which saved in database
            const isMatch = await bcrypt.compare(password, user.password) 

            // if isMatch = false - passwords DO NOT match
            if(!isMatch) {
                return response.status(400).json({ message: 'Invalid password' })
            } 

            // if email and password OK - proceed to authorization via JWT token 
            // to generate JWT token - use library jsonwebtoken 
            // npm i jsonwebtoken 
            const token = jwt.sign(
                // data to be crypt in jwt token 
                // also can be added: user.name, user.email 
                // jwtSecret in config-default.json - jwt secret key 
                // expiresIn: when jwt token expires (1h - 1 hour)
                // parameters of jwt.sign function: 
                { userId: user.id }, 
                config.get('jwtSecret'), 
                { expiresIn:  '1h'}
            )
            
            // without status, because status is 200 by default 
            response.json({ token, userId: user.id })
            
        } catch (e) {
            response.status(500).json({ message: 'Something went wrong. Try again' })
        }
})


module.exports = router 

