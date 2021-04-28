const assert = require('assert');
const auth = require('./auth');
const dotenv = require('dotenv');

dotenv.config();

describe('Login', function() {
  describe('When a invalid user tries to login', function() {
    it('should return an error', function() {
      let req = {
        'body': {
          'user': 'leonardo',
          'pwd': '12345'
        }
      };
      let res = {
        send: function(){ },
        json: function(err){
            assert.equal(err.message, 'Unauthorized');
        },
        status: function(responseStatus) {
            assert.equal(responseStatus, 401);
            return this; 
        }
      };
      auth.login(req, res);
    });
  });

  describe('When a valid user tries to login', function() {
    it('should return a token', function() {
      let req = {
        'body': {
          'user': 'wagner',
          'pwd': '12345'
        }
      };
      let res = {
        send: function(){ },
        json: function(res){
            assert.equal(res.auth, true);
        },
        status: function(responseStatus) {
            assert.equal(responseStatus, 200);
            return this; 
        }
      };
      auth.login(req, res);
    });
  });
});

describe('Logout', function() {
  describe('When a user tries to logout', function() {
    it('should clean the token', function() {
      let req = {};
      let res = {
        send: function(){ },
        json: function(res){
            assert.equal(res.auth, true);
        },
        status: function(responseStatus) {
            assert.equal(responseStatus, 200);
            return this; 
        }
      };
      auth.logout(req, res);
    });
  });
});

describe('verifyJWT', function() {
  describe('When a user tries to login without a token', function() {
    it('should give a no token error', function() {
      let req = {
        'headers': {}
      };
      let res = {
        send: function(){ },
        json: function(err){
            assert.equal(err.message, "No token provided");
        },
        status: function(responseStatus) {
            assert.equal(responseStatus, 401);
            return this; 
        }
      };
      let valid = false;
      let next = function() {
        valid = true;
      }
      auth.verifyJWT(req, res, next);
      assert.equal(valid, false);
    });
  });

  describe('When a user tries to login with a invalid token', function() {
    it('should give a invalid token error', function() {
      let req = {
        'headers': {
          'x-access-token': '1'
        }
      };
      let res = {
        send: function(){ },
        json: function(err){
            assert.equal(err.message, "Failed to authenticate token");
        },
        status: function(responseStatus) {
            assert.equal(responseStatus, 500);
            return this; 
        }
      };
      let valid = false;
      let next = function() {
        valid = true;
      }
      auth.verifyJWT(req, res, next);
      assert.equal(valid, false);
    });
  });
  
  describe('When a user tries to login with a valid token', function() {
    it('should pass the validation', function() {
      let token;
      let req = {
        'body': {
          'user': 'wagner',
          'pwd': '12345'
        }
      };
      let res = {
        send: function(){ },
        json: function(res){
          token = res.token;
        },
        status: function(responseStatus) {
            return this; 
        }
      };
      auth.login(req, res);
      req = {
        'headers': {
          'x-access-token': token
        }
      };
      res = {
        send: function(){ },
        status: function() {
            return this; 
        }
      };
      let valid = false;
      let next = function() {
        valid = true;
      }
      auth.verifyJWT(req, res, next);
      assert.equal(valid, true);
    });
  });
});