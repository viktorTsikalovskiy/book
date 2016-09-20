'use strict';
module.exports = function (sequelize, DataTypes) {


    var book = sequelize.define('books', {
        name: {
            type: DataTypes.STRING,
            unique:{
                msg: "Книга с таким названием уже существует"
            }
        },
        author: {
            type: DataTypes.STRING
        },
        year: {
            type: DataTypes.INTEGER
        },
        pages: {
            type: DataTypes.INTEGER
        }
    }, {
        classMethods: {
        }
    });

    return book;
};