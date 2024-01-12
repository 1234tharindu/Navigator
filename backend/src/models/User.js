const { DataTypes } = require("sequelize");
const sequelize = require("../../configuration/db.config");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employeeNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nicNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "User",
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageMimetype: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  verificationCode: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  verificationCodeExpiration: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = User;
