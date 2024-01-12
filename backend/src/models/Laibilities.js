const { DataTypes } = require("sequelize");
const sequelize = require("../../configuration/db.config");
const Laibility = sequelize.define("Liabilities", {
  employeeNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  loanAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  installmentAmount: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  noOfInstallments: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  outAmount: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  outInstallments: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Laibility;
