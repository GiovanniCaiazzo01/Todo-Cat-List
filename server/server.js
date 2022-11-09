require("dotenv").config({ path: "./.env" });
// express
const express = require("express");
const app = express();

// imports
const { connectDB } = require("./connection/database");

// constans
const { PORT } = process.env || 5000;
const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`PORT IT'S UP AND RUNNING 🚀 ON ${PORT}`));
};

start();
