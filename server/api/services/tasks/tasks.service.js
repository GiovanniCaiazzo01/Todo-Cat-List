const { getDb } = require("../../../connection/database");

module.exports = {
  name: "tasks",
  actions: {
    async get_all(ctx) {
      const db = await getDb();

      try {
        const tasks = await db.collection("tasks").find({}).toArray();
        if (!tasks) {
          return {
            result: false,
            message: "Non è stato possibile recuperare i task.",
          };
        }

        return { result: true, message: "task recuperati con successo" };
      } catch (error) {
        return error;
      }
    },
  },
};
