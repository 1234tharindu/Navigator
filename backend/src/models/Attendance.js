const { DataTypes } = require("sequelize");
const sequelize = require("../../configuration/db.config");
const User = require("./User.js");
const Attendance = sequelize.define(
  "Attendances",
  {
    employeeNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    InTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    OutTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { timestamps: false }
);
User.hasMany(Attendance, { foreignKey: "employeeNumber" });

module.exports = Attendance;
