require("dotenv").config();
const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 5000;
const app = express();
const { sequelize } = require("./models");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const indexRoutes = require("./routes");

app.use("/", indexRoutes);

app.listen(port, async () => {
  console.log(`Server ready on port ${port}`);
  await sequelize.authenticate();
  console.log("Database connected");
});
