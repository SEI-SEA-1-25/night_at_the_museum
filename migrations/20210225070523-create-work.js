'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('works', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      objectId: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      primaryimageurl: {
        type: Sequelize.STRING
      },
      division: {
        type: Sequelize.STRING
      },
      culture: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('works');
  }
};