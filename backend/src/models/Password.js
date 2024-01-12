const { DataTypes } = require('sequelize');
const sequelize = require('../../configuration/db.config'); 
const User = require("./User.js")
const PasswordHistory = sequelize.define('PasswordHistory', {
  
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
User.hasMany(PasswordHistory, { foreignKey: 'userId' });

module.exports = PasswordHistory;
