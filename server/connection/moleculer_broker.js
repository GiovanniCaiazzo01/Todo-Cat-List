const { ServiceBroker } = require("moleculer");

const createServiceBroker = () => {
  try {
    console.log("broker created");
    return new ServiceBroker();
  } catch (error) {
    return error;
  }
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
      const broker = createServiceBroker();
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
