import { response } from 'express'
import jwt from 'jsonwebtoken' 

// to parse token 
// in Insomnia (in get me request) choose Auth - Bearer Token and paste token after login request

export default (request, response, next) => {
    // get token from request headers authorization
    // const token = request.headers.authorization; 
    // if token not come - pass string: 
    // delete 'Bearer' from token, to have only token and replace with empty string
    const token = (request.headers.authorization || '').replace(/Bearer\s?/, ''); 

    if(token) {
        try {
            const decodedToken = jwt.verify(token, 'secret123'); 

            // if token has been decoded - pass to request what was decoded 
            // id from token (_id, not iat (data of creation) from jwt.io website)
            request.userId = decodedToken._id; 
            next();
        } catch (error) {
            return response.status(403).json({
                message: 'Can not decode token',
            })
        }
    } else { 
        // return - do not execute further code, if have status 403
        return response.status(403).json({
            message: 'Do not have access (token)',
        })
    }

    // console.log(token); 
    // response.send(token);
}