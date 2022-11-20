require("dotenv").config({ path: "../../../.env" });
const { getDb } = require("../../../connection/database");
const { uuid } = require("uuidv4");
const axios = require("axios");

const getDate = () => {
  const date = new Date();
  const format = {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  };

  const toReturn = `${format.year}-${format.month}-${format.day}`;

  return toReturn;
};
const generateId = () => {
  let hexString = uuid();
  // remove decoration
  hexString = hexString.replace(/-/g, "");
  let base64String = Buffer.from(hexString, "hex").toString("base64");
  base64String = base64String.replace("/", "");
  return base64String;
};

const pickCatAvatar = async () => {
  const { PUBLIC_KEY_API_CAT } = process.env;
  const CAT_API = `https:api.thecatapi.com/v1/images/search?api_key=${PUBLIC_KEY_API_CAT}`;
  const data = await axios.get(CAT_API);
  let toReturn = data.data[0].url;
  return toReturn;
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
            {
              projection: {
                _id: 0,
                title: 1,
                description: 1,
                isDone: 1,
                timeStamp: 1,
                avatar: 1,
                task_id: 1,
              },
            }
          )
          .toArray();

        if (!tasks) {
          return {
            result: false,
            message: "Non è stato possibile recuperare i task.",
          };
        }

        return { result: true, tasks };
      } catch (error) {
        return error;
      }
    },
    async save_task(ctx) {
      const db = await getDb();

      const { title, description, isDone } = ctx.params;
      if (!title) {
        return { result: false, message: "Please insert at least a title" };
      }

      try {
        const save_task = await db.collection("task").insertOne({
          title,
          description,
          isDone,
          timeStamp: getDate(),
          task_id: generateId(),
          avatar: await pickCatAvatar(),
        });
        if (save_task.acknowledged === false) {
          return { result: false, message: "the task could not be saved" };
        }
        return { result: true, message: "Task added successfully" };
      } catch (error) {
        return error;
      }
    },

    async delete_task(ctx) {
      const db = await getDb();

      const { task_id } = ctx.params;

      if (!task_id) {
        return { result: false, message: "Task_id not present" };
      }

      try {
        const delete_task = await db
          .collection("task")
          .deleteOne({ task_id: task_id });

        if (!delete_task) {
          return {
            result: false,
            message: "there was a problem deleting this task",
          };
        }

        return { result: true, message: "Task deleted successfully" };
      } catch (error) {
        return error;
      }
    },
  },
};
