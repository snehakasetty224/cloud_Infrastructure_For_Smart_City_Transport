'use strict';

var Cookies = require('cookies'),
    crypto = require('crypto'),
    scheme = 'aes-256-cbc',
    key = 'cmpe281secret',
    USER_COOKIE = 'u',
    TTL = 15 * 24 * 3600 * 1000; //15 days

module.exports = (function() {

  function encrypt(text) {
    var cipher = crypto.createCipher(scheme, key);
    var crypted = cipher.update(text, 'utf-8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
  }

  function decrypt(data){
    var decipher = crypto.createDecipher(scheme, key);
    var decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
  }

  /**
   * Function setting user cookie
   * @method  setUserCookie
   */
  function setUserCookie(req, userId, role) {
    console.log('set user cookie, userId=' + userId);
    try {
      var cookies = new Cookies(req, req.res);
      cookies.set(USER_COOKIE, encrypt(JSON.stringify({u: userId, role: role})), {
        httpOnly: true,
        path: '/',
        expires: new Date(Date.now() + TTL),
        overwrite: true
      });
    } catch(ex) {
      console.log(ex);
    }
  }

  /**
   * Function get user cookie
   * @param Express request object
   * @return userId
   */
  function getUserId(req) {
    try {
      var cookies = new Cookies(req, req.res);
      var userCookie = cookies.get(USER_COOKIE);
      var data = JSON.parse(decrypt(userCookie));
      return data.u;
    } catch(ex) {
      //console.log(ex);
      return '';
    }
  }

  function getUserRole(req) {
    try {
      var cookies = new Cookies(req, req.res);
      var userCookie = cookies.get(USER_COOKIE);
      var data = JSON.parse(decrypt(userCookie));
      return data.role;
    } catch(ex) {
      //console.log(ex);
      return '';
    }
  }

  /**
   * Function handle user logout
   * @method logout
   */
  function logout(req) {
    try {
      var cookies = new Cookies(req, req.res);
      cookies.set(USER_COOKIE, null, {
        httpOnly: true,
        path: '/',
        expires: 0,
        overwrite: true
      });
    } catch(ex) {}
  }

  function userAuthenticated() {
    return function (req, res, next) {
      var userId = getUserId(req);
      if (userId === '' || userId.length !== 36) {
        next();
      } else {
        res.redirect(302, '/dashboard');
      }
    };
  }

  function userRequiredLoggedIn() {
    return function (req, res, next) {
      var userId = getUserId(req);
      if (userId !== '') {
        next();
      } else {
        res.redirect(302, '/signin');
      }
    };
  }

  /** Interface for user class **/
  return {
    setUserCookie: setUserCookie,
    getUserId: getUserId,
    getUserRole: getUserRole,
    logout: logout,
    userAuthenticated: userAuthenticated,
    userRequiredLoggedIn: userRequiredLoggedIn
  };

}());
