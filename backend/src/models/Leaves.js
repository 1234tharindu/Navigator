const { DataTypes } = require("sequelize");
const sequelize = require("../../configuration/db.config");
const User = require("../models/User");
const Leaves = sequelize.define(
  "Leaves",
  {
    employeeNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Total: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: false }
);
User.hasMany(Leaves, { foreignKey: "employeeNumber" });
Leaves.belongsTo(User, { foreignKey: "employeeNumber" });
module.exports = Leaves;
