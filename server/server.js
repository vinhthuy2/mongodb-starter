const { mongoose } = require("./db/mongoose");
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

app.listen(3000, () => {
  console.log("started on port 3000");
});
