"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userType: {
        type: Sequelize.ENUM("0", "1", "2"),
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },

      sponsorId: {
        type: Sequelize.STRING,
      },
      parentId: {
        type: Sequelize.STRING,
      },
      dob: {
        type: Sequelize.DATE,
      },
      leftBV: {
        type: Sequelize.DOUBLE,
      },
      rightBV: {
        type: Sequelize.DOUBLE,
      },
      address: {
        type: Sequelize.TEXT,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
      },
      position: {
        type: Sequelize.STRING,
      },

      nomineName: {
        type: Sequelize.STRING,
      },
      nominePhone: {
        type: Sequelize.STRING,
      },
      nomineRelation: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "deactive",
      },
      password: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user");
  },
};
