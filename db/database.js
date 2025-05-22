const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('ludoteca','postgres','S0portecc1@08',{ host: 'localhost', dialect : 'postgres', loggin : false});
module.exports = sequelize;