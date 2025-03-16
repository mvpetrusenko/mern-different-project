## Git

(git init)
git branch
git branch -M main (rename local branch to main)
git branch

git add . (adding all files to commit)

git commit -m "commit message"

git remote add origin https://github.com/your_username/your_repository_name.git // Or the SSH URL

git push -u origin main

## Backend

body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body

This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request

npm install --save express mongodb body-parser

In package.json in dependencies there will be installed programs

MERN stack - MongoDb (not-related database), Express, React, Nodejs

npm -v

node -v

npm init (with Enter: entry point: app.js; keywords: mern, react; author: Mariia R <test5@gmail.com>)

package.json will be generated

create file app.js

npm install express mongoose

Mongoose - js library, to connect Node.js with MongoDB

(-D to move it all to dev dependencies):

npm install -D nodemon concurrently

nodemon is a tool that helps develop Node.js based applications
by automatically restarting the node application when file changes
in the directory are detected (to auto restart server)

concurrently npm package (at the same time) to run multiple scripts with one command - to
run at the same time frontend and backend !!!

edit in package.json:

"scripts": {
"start": "node app.js",
"server": "nodemon app.js"
}

    start - to start your backend project

    server - to run backend

to run these scripts, for example: npm run server

CTRL C - exit from terminal

to work with config and not hardcore port in app server:

https://www.npmjs.com/package/config

npm i config

create folder config in the root of the project and in it file default.json (to save
constants for the project)

to connect to MongoDB add mongoose

method connect returns promise, to use syntax of async await wrap it with function

https://www.mongodb.com/ - cloud database

MongoDB - sign in - create a project - create a cluster (free) -
azure - poland (choose server from the nearest country - the nearer the faster connection will be)

Configure mongo connect:
npm run server
When cluster has been created - click the Connect button -
Add a connection IP address (or use your current IP address automatically - Your current IP address (176.105.44.12) has been added to enable local connectivity)

set user and password to access database: mariia - test
Click the Create Database User button
Click Choose a connection method button - Drivers - it will show Node.js driver version
and mongodb+srv line (connection string) - Copy - Close - add to config-default json line to mongoURI
edit mongodb+srv://mariia:<db_password> with mongodb+srv://mariia:test

package.json - scripts:
server - backend
client - frontend
dev - backend + frontend ("dev": "concurrently \"npm run server\" \"npm run client\""): npm run dev

Creating frontend (client):
in the root of the project: npx create-react-app client
to add frontend project in the folder client
to install npm different packages only in frontend: cd client/ and from the client folder install

config-default.json

/_ "mongoUri": "mongodb+srv://mariia:test@cluster0.eu6w7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" _/

Use import/export from frontend in Node.js: in package json add "type": "module", :
"name": "mern-different-project",
"version": "1.0.0",
"description": "backend for react javascript different project",
"main": "app.js",
"type": "module",
"scripts":
Now in app.js (node.js) we can write ecma script (import instead of require)

mongodb - cluster - connect - connect your application (copy link: mobgodb-srv...)

Create database in mongodb compass:
add between mongodb.net/ and ? blog (mongodb.net/blog?)
mongodb+srv://mariia:test@cluster0.eu6w7.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0
to connect not only to mongodb server, but to mongodb database
refresh page in mongodb compass
in mongodb compass appears folder blog with table users
via Insomnia send post /registration request with body
in Insomnis response:
{
"fullName": "Tom",
"email": "test@test.com",
"passwordHash": "$2b$10$vjkJAjtvlFG7GsNv2HSijeP74c/VGY1zKIYZ/NR7hX.UvtX03VI5O",
"\_id": "67d578ee10d1986b6a2098a2",
"createdAt": "2025-03-15T12:56:14.879Z",
"updatedAt": "2025-03-15T12:56:14.879Z",
"\_\_v": 0
}

refresh mongodb compass folder blog-users: appears the same response as in Insomnia - it is a document with
the info about created user

For not to change body email... - before sending Insomnia request with the same body - delete
user from mongodb compass

---

npm install axios

To Frontend:

file axios.js:

import axios from 'axios'

const instance = axios.create({
baseUrl: 'http://localhost:5000'
});

export default instance;

To Check frontend -> backend:
import axios from './axios'

export const Home = () => {
React.useEffect(() => {
axios.get('/posts');
}, [])
}

Handler function for button login:
import axios from './axios'

const navigate = useNavigate()
const onSubmit = async () => {
try {
// send to server your request
setLoading(true);

        // get from this request data
        // do request to axios and pass to if fields (from loginValidation):
        const fields = {
            title,
            imageUrl,
            tags
        };

        // pass data to backend:
        const { data } = await axios.post('/login', fields);
        // get id from backend:
        const id = data._id;

        // move to the post finding in database
        navigate(`/posts/${id}`);

    } catch (error) {
        dd
    }

}

error CORS - cannot do request from one port (frontend) to another port (backend):
into backend project - npm install cors
