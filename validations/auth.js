import { body } from 'express-validator' 

// isEmail - if email is correct - pass it 
// body('imageUrl').optional().isUrl() 
// response msg = Invalid email format
export const registrationValidation = [
    body('email', 'Invalid email format').isEmail(), 
    body('password', 'Password length less 5 symbols').isLength({ min: 5 }), 
    body('fullName', 'Fill in full name').isLength({ min: 3 }), 
];