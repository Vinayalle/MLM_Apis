"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../../config/database");
const AppError = require("../../utils/appError");
const project = require("./project");
const user = require("./user");

const wallet = sequelize.define(
  "wallet",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalIncome: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },

    matchingIncome: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    directIncome: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    repurchaseIncome: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    franchiseIncome: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    royalityIncome: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
  }
);

// user.hasOne(wallet, { foreignKey: "userId" }); // One user has one wallet
// wallet.belongsTo(user, { foreignKey: "userId" }); // Wallet belongs to a user

module.exports = wallet;
