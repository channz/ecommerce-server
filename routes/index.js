const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authentication");
const authController = require("../controllers/authController");
const dataController = require("../controllers/dataController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/islogin", auth, authController.isLogin);

router.get("/stores", dataController.getAllStores);
router.get("/stores/:id", dataController.getStoreById);
router.post("/stores", dataController.createStore);
router.put("/stores/:id", dataController.updateStore);

router.get("/products", dataController.getAllProducts);
router.get("/products/:id", dataController.getProductById);
router.post("/products", dataController.createProduct);
router.put("/products/:id", dataController.updateProduct);
router.delete("/products/:id", dataController.deleteProduct);

router.get("/orders", dataController.getOrders);
router.post("/orders", dataController.createOrder);

router.get("/transactions/:id", dataController.getTransaction);
router.post("/transactions", dataController.createTransaction);

module.exports = router;
