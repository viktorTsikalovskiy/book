"use strict";

const app = require('koa')(),
    config = require('./app/config/appconfig.json'),
    db = require('./app/models'),
    serve = require('koa-static'),
    favicon = require('koa-favicon'),
    path = require('path'),
    body = require('koa-better-body');

app.use(serve(__dirname + '/../public'));

app.use(favicon(__dirname + '/../public/favicon.ico'));

app.use(body({
    encoding: 'utf-8',
    uploadDir: path.join(__dirname, 'uploads'),
    keepExtensions: true
}));

var passport = require('./app/helpers/passport')(app, config);
require('./app/helpers/router')(app, passport);
require('./app/helpers/logger')(app); // request logger
require('./app/helpers/ejs')(app);
require('koa-qs')(app, 'strict');


// console.log(new Date())
db.sequelize.sync().then(()=> {
    let chain = Promise.resolve();
    chain = chain.then(()=>db.users.findOrCreate({where: {name: "system"}, defaults: {
        id: 1,
        name: "example",
        password: "$2a$10$uTzJ2f4p3mX75VgOwI9YmOlbRQtWmI6Bdsaob3vb..YCoq2jh9YfK", //1234
    },logging:false}).spread((user,created)=>{
        console.log(`User: ${created} ${JSON.stringify(user)}`)
    }));


    app.listen(config.port);
    console.log(`Connected to database and listening on port ${config.port}`);
    return false;
}).catch((err)=> {
    console.log(err);
});
module.exports = app;


