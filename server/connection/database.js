require("dotenv").config({ path: "./.env" });
const { MongoClient } = require("mongodb");

const connectDb = async () => {
  const { URI } = process.env;
  const client = new MongoClient(URI);
  try {
    console.log("Databese its ready to be droped in production");
    await client.connect();
    return client.db("Todo");
  } catch (error) {
    return error;
  }
};

module.exports.getDb = async () => {
  let db = undefined;
  let instance = 0;

  try {
    instance++;
    console.log(`Database instance: ${instance}`);
    if (db === undefined) {
      console.log("preparing a new db instancion...");
      db = await connectDb();
      return db;
    }
    console.log("there are already an instance of databse alive..");
    return db;
  } catch (error) {
    return error;
  }
};
