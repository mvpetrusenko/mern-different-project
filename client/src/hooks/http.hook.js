import {useState, useCallback} from 'react' 

// custom hook useHttp - add it to authpage
export const useHttp = () => {
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null) 

    // url... - default values 
    // useCallback lets you cache a function definition between re-renders 
    // try - catch: to work with operator async await 
    const request = useCallback(async (url, method='GET', body = null, headers = {}) => { 
        setLoading(true)
        try { 

            // check if body is passed to request function 
            // if there is a body, turn body into a string and add header
            // if not body will be null, and it won`t take into account 
            // key - content-type 
            // in console.log in terminale - data from server (backend) 
            // in console in DevTools - from frontend (Network - request payload)
            if (body) {
                body.JSON.stringify(body) 
                headers['Content-Type'] = 'application/json'
            }


            const response = await fetch(url, { method, body, headers }) 
            // to parse response 
            const data = await response.json() 

            // if field ok of response is NOT ok (!) 
            // throw message or default text '' 
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong')
            } 

            // if we finished request, even if there was an error: 
            // loading false = there is no more loading
            setLoading(false)
            // if everything with request is ok: return data from server
            return data



        } catch (e) {
            setLoading(false) 
            setError(e.message) 
            // to handel thise error in the componenets - throw this error: 
            throw e
        }
    }, []) 

    const clearError = () => setError(null)

    return{ loading, request, error, clearError }
}