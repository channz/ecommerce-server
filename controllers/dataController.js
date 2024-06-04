const model = require("../models/index");
const Validator = require("fastest-validator");
const v = new Validator();

const getAllStores = async (req, res) => {
  try {
    const stores = await model.Store.findAll();
    if (!stores) {
      throw "No stores found";
    }
    res.status(200).send({
      status: true,
      data: stores,
      message: "Successfully retrieved stores",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: false,
      message: error,
    });
  }
};

const createStore = async (req, res) => {
  try {
    const schema = {
      name: { type: "string", min: 1, max: 255 },
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
      console.log(validate);
      return res.status(400).json({
        status: false,
        errors: validate[0].message,
      });
    }

    const newStore = await model.Store.create(req.body);
    res.status(201).send({
      status: true,
      data: newStore,
      message: "Store created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: false,
      message: "Failed to create store",
    });
  }
};

const getStoreById = async (req, res) => {
  try {
    const storeId = req.params.id;
    const store = await model.Store.findByPk(storeId);
    if (!store) {
      throw "Store not found";
    }
    res.status(200).send({
      status: true,
      data: store,
      message: "Successfully retrieved store",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: false,
      message: error,
    });
  }
};

const updateStore = async (req, res) => {
  try {
    const schema = {
      name: { type: "string", min: 1, max: 255 },
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
      console.log(validate);
      return res.status(400).json({
        status: false,
        errors: validate[0].message,
      });
    }

    const storeId = req.params.id;
    const store = await model.Store.findByPk(storeId);
    if (!store) {
      throw "Store not found";
    }

    await store.update(req.body);
    res.status(200).send({
      status: true,
      data: store,
      message: "Store updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: false,
      message: "Failed to update store",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await model.Product.findAll();
    if (!products) {
      throw "No products found";
    }
    res.status(200).send({
      status: true,
      data: products,
      message: "Successfully retrieved products",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: false,
      message: error,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const schema = {
      name: { type: "string", min: 1, max: 255 },
      price: { type: "number", min: 0 },
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
      console.log(validate);
      return res.status(400).json({
        status: false,
        errors: validate[0].message,
      });
    }

    const newProduct = await model.Product.create(req.body);
    res.status(201).send({
      status: true,
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: false,
      message: "Failed to create product",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await model.Product.findByPk(productId);
    if (!product) {
      throw "Product not found";
    }
    res.status(200).send({
      status: true,
      data: product,
      message: "Successfully retrieved product",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: false,
      message: error,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const productId = req.params.id;
    const schema = {
      name: { type: "string", min: 1, max: 255 },
      price: { type: "number", min: 0 },
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
      console.log(validate);
      return res.status(400).json({
        status: false,
        errors: validate[0].message,
      });
    }

    const product = await model.Product.findByPk(productId);
    if (!product) {
      throw "Product not found";
    }

    if (product.sellerId !== sellerId) {
      throw "Unauthorized to update product";
    }

    await product.update(req.body);
    res.status(200).send({
      status: true,
      data: product,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: false,
      message: error,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const productId = req.params.id;

    const product = await model.Product.findByPk(productId);
    if (!product) {
      throw "Product not found";
    }

    if (product.sellerId !== sellerId) {
      throw "Unauthorized to delete product";
    }

    await product.destroy();
    res.status(200).send({
      status: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: false,
      message: error,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const buyerId = req.user.id;
    const orders = await model.Order.findAll({ where: { buyerId: buyerId } });
    if (!orders) {
      throw "No orders found for this buyer";
    }
    res.status(200).send({
      status: true,
      data: orders,
      message: "Successfully retrieved buyer's orders",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: false,
      message: error,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const buyerId = req.user.id;
    const productIds = req.body.productIds;
    if (!productIds || productIds.length === 0) {
      throw "Please provide at least one product ID";
    }

    const products = await model.Product.findAll({ where: { id: productIds } });
    if (products.length !== productIds.length) {
      throw "Invalid product IDs";
    }

    const order = await model.Order.create({
      buyerId: buyerId,
      status: "pending",
    });
    await order.addProduct(productIds);

    res.status(201).send({
      status: true,
      data: order,
      message: "Order created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: false,
      message: error,
    });
  }
};

const processOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const status = req.body.status;

    const order = await model.Order.findByPk(orderId);
    if (!order) {
      throw "Order not found";
    }

    if (order.buyerId !== req.user.id) {
      throw "Unauthorized to process order";
    }

    const validStatuses = ["pending", "processing", "completed", "canceled"];
    if (!validStatuses.includes(status)) {
      throw "Invalid order status";
    }

    await order.update({ status: status });
    res.status(200).send({
      status: true,
      data: order,
      message: `Order status updated to ${status}`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: false,
      message: error,
    });
  }
};

const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await model.Transaction.findAll({
      where: {
        buyerId: userId,
      },
    });
    if (!transactions) {
      throw "No transactions found for this user";
    }
    res.status(200).send({
      status: true,
      data: transactions,
      message: "Successfully retrieved user's transactions",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: false,
      message: error,
    });
  }
};

const createTransaction = async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const paymentInfo = req.body.paymentInfo;

    const order = await model.Order.findByPk(orderId);
    if (!order) {
      throw "Order not found";
    }

    if (order.status !== "pending") {
      throw "Order is not in pending status";
    }

    const transaction = await model.Transaction.create({
      orderId: order.id,
      paymentInfo: paymentInfo,
      status: "pending",
    });

    setTimeout(() => {
      transaction.update({ status: "completed" });
      order.update({ status: "processing" });
    }, 5000);

    res.status(201).send({
      status: true,
      data: transaction,
      message: "Transaction created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: false,
      message: error,
    });
  }
};

const processTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const status = req.body.status;

    const transaction = await model.Transaction.findByPk(transactionId);
    if (!transaction) {
      throw "Transaction not found";
    }

    const validStatuses = ["pending", "processing", "completed", "failed"];
    if (!validStatuses.includes(status)) {
      throw "Invalid transaction status";
    }

    await transaction.update({ status: status });
    res.status(200).send({
      status: true,
      data: transaction,
      message: `Transaction status updated to ${status}`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: false,
      message: error,
    });
  }
};

module.exports = {
  getAllStores,
  createStore,
  getStoreById,
  updateStore,
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getOrders,
  createOrder,
  processOrder,
  getTransactions,
  createTransaction,
  processTransaction,
};
