const express = require("express");
const router = express.Router();
const { getDB } = require("../connection/database");

router.get("/add-task", async (req, res) => {
  const data = getDB().collection("task").findOne({});
  return res.send(data);
});

module.exports = router;
