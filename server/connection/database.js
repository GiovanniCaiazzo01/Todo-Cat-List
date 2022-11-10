require("dotenv").config({ path: "./.env" });
const { MongoClient } = require("mongodb");

let db;

const connectDB = async () => {
  // Connection URL
  const { URI } = process.env;
  const client = new MongoClient(URI);

  // Databse name
  const dbName = "Todo";
  try {
    await client.connect();
    console.log("Databese it's ready to be dropt in production");
  } catch (error) {
    console.log(error);
  }

  return (db = client.db(dbName));
};

module.exports.getDB = () => {
  if (db === undefined) {
    return connectDB();
  }
  return db;
};
