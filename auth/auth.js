'use strict';
const jwt = require('jsonwebtoken');

exports.login = function(req, res){
    //esse teste abaixo deve ser feito no seu banco de dados
    if(req.body.user === 'wagner' && req.body.pwd === '12345'){
      //auth ok
      const id = 1; //esse id viria do banco de dados
      var token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      return res.status(200).json({ auth: true, token: token });
    }
    
    res.status(401).json({message: 'Unauthorized'});
};