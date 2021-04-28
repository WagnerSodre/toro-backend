const assert = require('assert');
const auth = require('./auth');
const dotenv = require('dotenv');

dotenv.config();

describe('Auth', function() {
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