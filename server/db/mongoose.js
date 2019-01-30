const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://admin:root123@ds131531.mlab.com:31531/test-mongodb-v1",
    { useNewUrlParser: true }
  )
  .catch(() => {
    mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/TodoApp",
      { useNewUrlParser: true }
    );
  });
module.exports = { mongoose };
