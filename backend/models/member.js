"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      // Define association with Group model
      Member.belongsTo(models.Group, { foreignKey: "groupId" });

      // Define association with User model
      Member.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Member.init(
    {
      memberId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      groupId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Member",
      tableName: "members",
      timestamps: true,
      updatedAt: "updatedAt",
    }
  );
  return Member;
};
