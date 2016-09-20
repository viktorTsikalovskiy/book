"use strict";

const path = require('path'),
      render = require('koa-ejs');

module.exports = function (app){
    render(app, {
        root: path.join(__dirname,'../views'),
        layout: 'layout',
        viewExt: 'ejs',
        cache: false,
        debug: true
    });
};