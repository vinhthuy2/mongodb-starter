var env = process.env.NODE_ENV || "development";

if (env === "development") {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp";
} else if (env === "test") {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest";
} else {
  process.env.MONGODB_URI =
    "mongodb://admin:root123@ds131531.mlab.com:31531/test-mongodb-v1";
}

console.log("env *******", env);
console.log("mongo URI", process.env.MONGODB_URI);
