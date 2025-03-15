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
