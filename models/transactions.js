"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transactions.belongsTo(models.Users, { foreignKey: "userId" });
      Transactions.hasMany(models.Orders, { foreignKey: "transactionId" });
    }
  }
  Transactions.init(
    {
      userId: DataTypes.INTEGER,
      totalAmount: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transactions",
    }
  );
  return Transactions;
};
