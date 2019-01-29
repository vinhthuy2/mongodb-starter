const { ObjectID } = require("mongodb");
const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo.model");

var id = "5c505d988b296a1d548d16b011";

// if (!ObjectID.isValid(id)) {
//   console.log("id not valid");
// }

// Todo.find({
//   _id: id
// }).then(todos => {
//   console.log("Todos", todos);
// });

// Todo.findOne({
//   _id: id
// }).then(todo => {
//   console.log("todo:", todo);
// });

Todo.findById(id)
  .then(todo => {
    if (!todo) {
      return console.log("Id not found");
    }
    console.log("todo by id", todo);
  })
  .catch(e => console.log(e));
