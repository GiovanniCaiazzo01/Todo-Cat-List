const express = require("express");
const router = express.Router();
const { broker } = require("../server");

router.get("/read-task", async (req, res) => {
  const tasks = await global.broker.call("tasks.get_all");
  return res.send(tasks);
});

module.exports = router;
