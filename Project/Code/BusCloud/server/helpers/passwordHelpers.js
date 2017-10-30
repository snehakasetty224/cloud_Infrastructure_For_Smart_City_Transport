//Referenced: http://codetheory.in/using-the-node-js-bcrypt-module-to-hash-and-safely-store-passwords/

'use strict';

var bcrypt = require('bcrypt');

module.exports = {
  hashPassword: function(plainText) {
    // Generate a salt
    var salt = bcrypt.genSaltSync(10);
    // Hash the password with the salt
    var hash = bcrypt.hashSync(plainText, salt);
    return hash;
  },

  verifyPassword: function(plainText, hashText) {
    // console.log(plainText);
    // console.log(hashText);
    return bcrypt.compareSync(plainText, hashText);
  }

}
