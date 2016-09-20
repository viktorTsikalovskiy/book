'use strict';
const router = require('koa-router')(),
    models = require('../models');


module.exports = function (app, passport) {

    let BookController = require('../controllers/book'),
        LoginController = require('../controllers/login');

    router
    //login
        .get('/login', LoginController.login)
        .post('/login', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
        }))

    //book
        .get('/', BookController.index)
        .get('/book/add', BookController.add)
        .post('/book/add', BookController.addBook)
        .get('/book/update/:id', BookController.update)
        .post('/book/update/:id', BookController.update_post)
        .get('/book/delete/:id', BookController.delete_book);

    app.use(router.routes());
};
