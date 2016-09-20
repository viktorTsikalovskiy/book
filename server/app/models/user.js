/**
 * Created by SERGEY on 30.08.2016.
 */
'use strict';
module.exports = function (sequelize, DataTypes) {


    var user = sequelize.define('users', {
        name: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: "User"
        }
    }, {
        classMethods: {
        }
    });

    return user;
};