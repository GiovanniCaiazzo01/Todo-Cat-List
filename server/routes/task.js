const express = require("express");
const dbConnection = require("../connection/database");
const router = express.Router();

router.get("/add-task", async (req, res) => {
  const db = await dbConnection.getDb();
  const data = await db.collection("task").findOne({});
  console.log(data);
  return res.send("wewe");
});

module.exports = router;
