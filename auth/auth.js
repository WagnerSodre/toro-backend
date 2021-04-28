'use strict';
const jwt = require('jsonwebtoken');

exports.login = function(req, res){
    //validation should use db
    if(req.body.user === 'wagner' && req.body.pwd === '12345'){
      //auth ok
      const id = 1; //id should come from db
      var token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      return res.status(200).json({ auth: true, token: token });
    }
    
    res.status(401).json({message: 'Unauthorized'});
};

exports.logout = function(req, res){
    res.status(200).send({ auth: false, token: null }); 
};