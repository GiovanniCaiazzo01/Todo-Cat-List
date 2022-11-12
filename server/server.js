require("dotenv").config({ path: "./.env" });
// express
const express = require("express");
const app = express();

// imports
const { getDb } = require("./connection/database");
const { getServiceBroker } = require("./connection/moleculer_broker");
// constans
const { PORT } = process.env || 5000;

// routes
app.use("/todo", require("./routes/task"));

// start
const start = async () => {
  await getDb();
  await getServiceBroker().start();
  app.listen(PORT, () => console.log(`PORT IT'S UP AND RUNNING 🚀 ON ${PORT}`));
};

start();
