const { mongoose } = require("./db/mongoose");
const { ObjectID } = require("mongodb");
const { Todo } = require("./models/todo.model");
const { User } = require("./models/user.model");
const express = require("express");
const bodyParser = require("body-parser");
//mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    completedAt: req.body.completedAt
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/todos", (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

// GET /todos/123554
app.get("/todos/:id", (req, res) => {
  var id = req.params.id;

  // validate id by ObjectID isValid
  // 404 was not found - send back empty body
  if (!ObjectID.isValid(id)) {
    res.status(404).send({ msg: "Id is not valid" });
    return console.log("the id is invalid");
  }

  // findById
  // success
  // if todo - send it back
  // if no todo - send back 404 with empty body
  Todo.findById(id)
    .then(todo => {
      if (todo) {
        res.send({ todo });
      } else {
        res.status(404).send({ msg: "id is not found" });
      }
    })
    .catch(e => {
      res.status(400).send({ msg: e });
    });
  // error
  // 400 - and send empty body back
});

app.listen(3000, () => {
  console.log("started on port 3000");
});

module.exports = { app };
