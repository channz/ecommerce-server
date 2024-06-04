"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Product 1",
          price: 1000,
          stock: 10,
          description: "Description for product 1",
          storeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          category: "a",
        },
        {
          name: "Product 2",
          price: 1500,
          stock: 5,
          description: "Description for product 2",
          storeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          category: "a",
        },
        {
          name: "Product 3",
          price: 2000,
          stock: 2,
          description: "Description for product 3",
          storeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          category: "a",
        },
        {
          name: "Product 4",
          price: 3000,
          stock: 20,
          description: "Description for product 4",
          storeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          category: "b",
        },
        {
          name: "Product 5",
          price: 2500,
          stock: 8,
          description: "Description for product 5",
          storeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          category: "b",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {});
  },
};
