"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GroupMessage extends Model {
    static associate(models) {
      // Define association with Group model
      GroupMessage.belongsTo(models.Group, { foreignKey: "groupId" });

      // Define association with User model (sender)
      GroupMessage.belongsTo(models.User, { foreignKey: "senderId" });
    }
  }
  GroupMessage.init(
    {
      groupMessageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      groupId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      dateTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "GroupMessage",
      tableName: "group_messages",
      timestamps: true,
      updatedAt: "updatedAt",
    }
  );
  return GroupMessage;
};
