const { getDb } = require("../../../connection/database");
const { uuid } = require("uuidv4");

const getDate = () => {
  const date = new Date();
  const format = {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  };

  return format;
};
const generateId = () => {
  let hexString = uuid();
  // remove decoration
  hexString = hexString.replace(/-/g, "");
  let base64String = Buffer.from(hexString, "hex").toString("base64");
  return base64String;
};

module.exports = {
  name: "tasks",
  actions: {
    async get_all(ctx) {
      const db = await getDb();

      try {
        const tasks = await db
          .collection("task")
          .find(
            {},
            { projection: { _id: 0, title: 1, description: 1, isDone: 1 } }
          )
          .toArray();

        if (!tasks) {
          return {
            result: false,
            message: "Non è stato possibile recuperare i task.",
          };
        }

        const toReturn = {
          ...tasks,
          result: true,
          message: "task recuperati con successo",
        };

        return toReturn;
      } catch (error) {
        return error;
      }
    },
    async save_task(ctx) {
      const { title, description, isDone } = ctx.params.task;

      if (!title) {
        return { result: false, message: "Please insert at least a title" };
      }

      try {
        const save_task = await getDb.collection("task").insertOne({
          title,
          description,
          isDone,
          timeStamp: getDate(),
          task_id: generateId(),
        });
        if (save_task.acknowledged === false) {
          return { result: false, message: "the task could not be saved" };
        }
        return { result: true, message: "Task added successfully" };
      } catch (error) {
        return error;
      }
    },

    // da finire
    async delete_task(ctx) {
      const { task_id } = ctx.params;

      if (!task_id) {
        return { result: false, message: "Task_id not present" };
      }
      try {
        const delete_task = getDb().collection("task").deleteOne({ task_id });
        if (!delete_task) {
          return { result: false, message: "there was a problem" };
        }
      } catch (error) {}
    },
  },
};
