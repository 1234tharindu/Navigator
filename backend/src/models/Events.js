const { DataTypes } = require("sequelize");
const sequelize = require("../../configuration/db.config");

const Event = sequelize.define("Event", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull:true,
  },
});


sequelize.sync();

module.exports = Event;