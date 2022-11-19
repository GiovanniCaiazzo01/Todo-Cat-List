const express = require("express");
const router = express.Router();

router.get("/get_all", async (req, res) => {
  const tasks = await global.broker.call("tasks.get_all");
  return res.send(tasks);
});

router.post("/save", async (req, res) => {
  const { task } = req.body;
  const result = await global.broker.call("tasks.save_task", task);
  return res.send(result);
});

router.post("/delete-task", async (req, res) => {
  const { task_id } = req.body;
  const result = await global.broker.call("task.delete_task", { task_id });
  return res.send(result);
});

router.post("/update-task", async (req, res) => {
  const { task_id, to_update } = req.body;
  const result = await global.broker.call("task.delete_task", {
    task_id,
    to_update,
  });
  return res.send(result);
});
module.exports = router;
