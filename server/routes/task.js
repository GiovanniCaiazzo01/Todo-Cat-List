const express = require("express");
const router = express.Router();

router.get("/get_all_task", async (req, res) => {
  const tasks = await global.broker.call("tasks.get_all");
  return res.send(tasks);
});

router.post("/save_task", async (req, res) => {
  const { task } = req.body;
  const result = await global.broker.call("tasks.save_task", { task });
  return res.send(result);
});

module.exports = router;
