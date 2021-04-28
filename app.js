const http = require('http'); 
const express = require('express'); 
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const auth = require('./auth/auth');

dotenv.config();

const app = express(); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose
  .connect('mongodb://database:27017/', {
    useNewUrlParser: true
  })
  .then(result => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log(error);
  });
 
app.get('/', (req, res, next) => {
    res.json({message: "API is working"});
})

app.get('/userPosition', auth.verifyJWT, (req, res, next) => { 
    let userPosition = {
        "checkingAccountAmount": 234.00, // Saldo em conta corrente
        "positions": [
            {
                "symbol": "PETR4",
                "amount": 2,
                "currentPrice": 28.44,
            },
            {
                "symbol": "SANB11",
                "amount": 3,
                "currentPrice": 40.77
            },
        ],
        "consolidated": 413.19 // (234.00 + (28.44 * 2) + (40.77 * 3)
    }
    res.json(userPosition);
}) 
 
app.post('/auth/login', (req, res, next) => { 
    auth.login(req, res);
}) 
 
app.post('/auth/logout', function(req, res) {
    auth.logout(req, res);
})

const server = http.createServer(app); 

server.listen(process.env.PORT);
console.log(`Server is listening port ${process.env.PORT}`);