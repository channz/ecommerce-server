const express = require("express");
const router = express.Router();
const { Products, sequelize } = require("../models");
const authenticate = require("../middleware/authentication");
const authorize = require("../middleware/authorization");

// Create Products
router.post("/", authenticate, authorize(["SELLER"]), async (req, res) => {
  try {
    const products = await Products.create({
      ...req.body,
      storeId: req.user.id,
    });
    res.status(201).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read Productss
router.get("/", async (req, res) => {
  const productss = await sequelize.query("SELECT * FROM productss", {
    type: sequelize.QueryTypes.SELECT,
  });
  res.send(productss);
});

module.exports = router;
