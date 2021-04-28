const http = require('http'); 
const express = require('express'); 
const dotenv = require('dotenv');

dotenv.config();

const app = express(); 
 
app.get('/', (req, res, next) => {
    res.json({message: "API is working"});
})
 
app.get('/auth', (req, res, next) => { 
    
}) 
 
const server = http.createServer(app); 

server.listen(process.env.PORT);
console.log(`Server is listening port ${process.env.PORT}`);