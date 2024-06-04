const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authentication");
const authorize = require("../middleware/authorization");

// Register
router.post("/register", async (req, res) => {
  try {
    const users = await Users.create(req.body);
    res.status(201).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const users = await Users.findOne({ where: { email: req.body.email } });
    if (!users || !(await bcrypt.compare(req.body.password, users.password))) {
      return res.status(401).send({ error: "Login failed!" });
    }
    const token = jwt.sign({ id: users.id }, "jwt_secret");
    res.send({ users, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Protected route example
router.get("/profile", authenticate, async (req, res) => {
  res.send(req.users);
});

module.exports = router;
