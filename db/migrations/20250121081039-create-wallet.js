"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("wallet", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      totalIncome: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
      },
      matchingIncome: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
      },
      directIncome: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
      },
      repurchaseIncome: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
      },
      franchiseIncome: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
      },
      royalityIncome: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
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
    await queryInterface.dropTable("wallet");
  },
};
