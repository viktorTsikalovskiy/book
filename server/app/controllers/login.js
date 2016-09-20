"use strict";
const models = require('../models');

module.exports = {
    login: function*() {
        yield this.render('/login',{
            page: 'login'
        });

    }
};
