/**
 * Created by SERGEY on 30.08.2016.
 */
"use strict";
const session = require('koa-generic-session'),
    models = require("../models"),
    passport = require('koa-passport'),
    bcrypt = require("../helpers/bcrypt"),
    redisStore = require('koa-redis');

module.exports = function (app, config) {
    console.log(config);
    let LocalStrategy = require('passport-local').Strategy;

    passport.use(new LocalStrategy(function (username, password, done) {
        models.users.findOne({
            attributes: ['id', 'password'],
            where: {name: username}
        }).then(function (user) {
                if (!user) {
                    return done(null, false);
                }
            console.log(bcrypt.isValidPassword(user.password, password));
            if (!bcrypt.isValidPassword(user.password, password)) {
                    return done(null, false);
                }else{
                    return done(null,user.id)
                }

            }
        );
    }));

    passport.serializeUser(function (user, done) {

        models.users.find({
            attributes:['id'],
            where: {
                id:user
            }
        }).then(user=>{
            done(null,{
                id: user.id
            })
        })

    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    app.keys = [config.secret];
    app.use(session({
        store: redisStore()
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    return passport;
};