const mongoose = require("mongoose");

console.log(process.env.MONGO_URI);
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log("database connected " + conn.connection.host);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;
