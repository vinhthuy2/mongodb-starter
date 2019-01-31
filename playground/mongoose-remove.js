const { ObjectID } = require("mongodb");
const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/todo.model");

// Todo.remove({}).then(result => {
//   console.log(result);
// });

Todo.deleteMany({}).then(result => {
  console.log(result);
});

// Todo.findOneAndRemove({})
// Todo.findByIdAndRemove({})
Todo.findOneAndDelete({ _id: "5c530824e7bc3100170c538d" }).then(todo => {
  console.log(todo);
});

Todo.findByIdAndDelete("5c530824e7bc3100170c538d").then(todo => {
  console.log(todo);
});
