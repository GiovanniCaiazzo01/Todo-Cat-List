require("dotenv").config({ path: "./.env" });
// express
const express = require("express");
const app = express();

// imports
const { getDB } = require("./connection/database");

// constans
const { PORT } = process.env || 5000;

// routes
app.use("/todo", require("./routes/task"));

// start
const start = async () => {
  await getDB();
  app.listen(PORT, () => console.log(`PORT IT'S UP AND RUNNING 🚀 ON ${PORT}`));
};

start();
