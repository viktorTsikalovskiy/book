/**
 * Created by victor on 27.07.16.
 */
'use strict';
var bcrypt = require('bcrypt');

module.exports.createHash = function(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

module.exports.isValidPassword = function(userPassword, password){
        return bcrypt.compareSync(password, userPassword);
};