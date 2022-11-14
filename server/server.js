require("dotenv").config({ path: "./.env" });
// imports
const { getDb } = require("./connection/database");
const TASK_SERVICE = require("./api/services/tasks/tasks.service");

// Moleculer
const { ServiceBroker } = require("moleculer");

global.broker = new ServiceBroker({
  nodeID: "Todo-app",
});

global.broker.createService(TASK_SERVICE);

// express
const express = require("express");
const app = express();

// constans
const { PORT } = process.env || 5000;

// routes
app.use("/todo", require("./routes/task"));

// start
const start = async () => {
  await getDb();
  await global.broker.start();

  app.listen(PORT, () => console.log(`PORT IT'S UP AND RUNNING ON ${PORT} 🚀`));
};

start();
