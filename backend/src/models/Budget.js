const { DataTypes } = require("sequelize");
const sequelize = require("../../configuration/db.config");

const Budget = sequelize.define("Budget", {
  employeeNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  BudgetType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Budget;
