const { ServiceBroker } = require("moleculer");

// Mc imports
const TASK_SERVICE = require("../api/services/tasks/tasks.service");

const createService = (broker) => {
  broker.createService(TASK_SERVICE);
};
module.exports.getServiceBroker = () => {
  let broker = undefined;
  let instance = 0;
  console.log("------------------------------");
  try {
    instance++;
    console.log(`Broker instance: ${instance}`);

    if (broker === undefined) {
      console.log("preparing ServiceBroker instance...");
      broker = new ServiceBroker();
      createService(broker);
      console.log("------------------------------");

      return broker;
    }

    console.log("broker its already created");
    console.log("------------------------------");

    return broker;
  } catch (error) {
    return error;
  }
};
