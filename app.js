const http = require('http'); 
const express = require('express'); 
const app = express(); 
 
app.get('/', (req, res, next) => {
    res.json({message: "API is working"});
})
 
app.get('/auth', (req, res, next) => { 
    
}) 
 
const server = http.createServer(app); 

const port = 3000;
server.listen(port);
console.log(`Server is listening port ${port}`);