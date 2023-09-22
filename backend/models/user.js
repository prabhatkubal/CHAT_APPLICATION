"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Group, { as: "admin", foreignKey: "adminId" });
      // Define association with Member model
      User.hasMany(models.Member, { foreignKey: "userId" });

      // Define association with GroupMessage model
      User.hasMany(models.GroupMessage, { foreignKey: "senderId" });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.UUID,
      },
      firstname: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      refresh_token: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      updatedAt: "updatedAt",
    }
  );
  return User;
};
