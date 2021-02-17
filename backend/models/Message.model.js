const sequelize = require("./index");
const { DataTypes } = require("sequelize");

const User = require("./User.model");

const Message = sequelize.define(
  "Messages",
  {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Message.belongsTo(User);

module.exports = Message;
