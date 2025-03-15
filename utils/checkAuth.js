import { response } from 'express'
import jwt from 'jsonwebtoken' 

export default (request, response, next) => {
    // get token from request headers authorization
    const token = request.headers.authorization; 

    console.log(token);
}