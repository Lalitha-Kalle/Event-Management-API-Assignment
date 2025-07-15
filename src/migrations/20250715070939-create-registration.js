'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Registrations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: 'id'
        },
        onDelete: 'CASCADE' //i added this constraint because if any user is deleted then it remove registration of that user
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Events',
          key: 'id'
        },
        onDelete: 'CASCADE' //same here if event is deleted then it remove registration of that event
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });

    /*
      this is constraint to prevent duplication registration for an event by user
    */
    await queryInterface.addConstraint('Registrations', {
      fields: ['userId', 'eventId'],
      type: 'unique',
      name: 'unique_user_event' /* this is constraint name */
    });
  },



  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Registrations');
  }
};