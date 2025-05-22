const {DataTypes} = require('sequelize');
const sequelize = require('../database');


const User = sequelize.define('User', {
    username : {type : DataTypes.STRING,unique : true, allowNull : false,},
    password : {type : DataTypes.STRING, allowNull: false},
    rol: {type: DataTypes.ENUM('admin', 'usuario'),allowNull: false,defaultValue: 'usuario',},

}, {tableName : 'usuarios', timmestamps : true});


module.exports = User;