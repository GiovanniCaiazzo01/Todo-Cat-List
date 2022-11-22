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

router.delete("/delete-task/:task_id", async (req, res) => {
  const { task_id } = req.params;
  const result = await global.broker.call("tasks.delete_task", { task_id });
  return res.send(result);
});

router.put("/update-task/:task_id", async (req, res) => {
  const { fields } = req.body;
  const { task_id } = req.params;
  const result = await global.broker.call("tasks.edit_task", {
    task_id,
    fields,
  });
  return res.send(result);
});
module.exports = router;
