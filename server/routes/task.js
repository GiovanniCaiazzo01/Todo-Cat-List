const express = require("express");
const router = express.Router();
let getBroker = require("../connection/moleculer_broker");

broker = getBroker.getServiceBroker();

router.get("/read-task", async (req, res) => {
  const tasks = broker.call("tasks.get_all");
  return res.send(tasks);
  res.send("we");
});

module.exports = router;
