"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../../config/database");
const AppError = require("../../utils/appError");
const project = require("./project");
const wallet = require("./wallet");

const user = sequelize.define(
  "user",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userType: {
      type: DataTypes.ENUM("0", "1", "2"),
      allowNull: false,
      defaultValue: 0,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "firstName cannot be null",
        },
        notEmpty: {
          msg: "firstName cannot be empty",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "lastName cannot be null",
        },
        notEmpty: {
          msg: "lastName cannot be empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "email cannot be null",
        },
        notEmpty: {
          msg: "email cannot be empty",
        },
        isEmail: {
          msg: "Invalid email id",
        },
      },
    },
    sponsorId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parentId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    leftBV: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0,
    },
    rightBV: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0,
    },
    dob: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    position: {
      type: DataTypes.STRING,
    },

    nomineName: {
      type: DataTypes.STRING,
    },
    nominePhone: {
      type: DataTypes.STRING,
    },
    nomineRelation: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "deactive",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password cannot be null",
        },
        notEmpty: {
          msg: "password cannot be empty",
        },
      },
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {
        if (!this.password || typeof this.password !== "string") {
          throw new AppError("Password is required and must be a string", 400);
        }

        if (this.password.length < 7) {
          throw new AppError("Password length must be greater than 7", 400);
        }

        if (value === this.password) {
          const hashPassword = bcrypt.hashSync(value, 10);
          this.setDataValue("password", hashPassword);
        } else {
          throw new AppError(
            "Password and confirm password must be the same",
            400
          );
        }
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: "user",
  }
);

user.hasMany(project, { foreignKey: "createdBy" });
project.belongsTo(user, {
  foreignKey: "createdBy",
});

// user.hasOne(wallet, { foreignKey: "userId", as: "wallet" });

// user.hasOne(wallet, { foreignKey: "userId" }); // One user has one wallet
// wallet.belongsTo(user, { foreignKey: "userId" }); // Wallet belongs to a user

module.exports = user;
