const express = require("express");
const router = express.Router();
const { Transactions, Orders, Products, sequelize } = require("../models");
const authenticate = require("../middleware/authentication");

// Create Transactions
router.post("/", authenticate, async (req, res) => {
  const { items } = req.body;
  const t = await sequelize.transactions();

  try {
    // Hitung totalAmount
    let totalAmount = 0;
    for (const item of items) {
      const products = await Products.findByPk(item.productsId);
      if (!products || products.stock < item.quantity) {
        throw new Error(`Products ${item.productsId} is not available`);
      }
      totalAmount += products.price * item.quantity;
    }

    // Buat Transactions
    const transactions = await Transactions.create(
      {
        userId: req.user.id,
        totalAmount,
        status: "PENDING",
      },
      { transactions: t }
    );

    // Buat Orders
    for (const item of items) {
      await Orders.create(
        {
          transactionsId: transactions.id,
          productsId: item.productsId,
          quantity: item.quantity,
          price: item.price,
        },
        { transactions: t }
      );

      // Kurangi stok produk
      const products = await Products.findByPk(item.productsId);
      products.stock -= item.quantity;
      await products.save({ transactions: t });
    }

    // Commit transaksi
    await t.commit();
    res.status(201).send(transactions);
  } catch (error) {
    // Rollback transaksi
    await t.rollback();
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
