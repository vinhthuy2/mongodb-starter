require("./config/config");

const { mongoose } = require("./db/mongoose");
const { ObjectID } = require("mongodb");
const { Todo } = require("./models/todo.model");
const { User } = require("./models/user.model");
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
//mongoose.Promise = global.Promise;

const app = express();
const port = process.env.PORT;

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

app.delete("/todos/:id", (req, res) => {
  // get the id
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    //validate the id --> not valid? --> return 404
    res.status(404).send({ msg: "Id is not valid" });
  }

  // remove todo by id
  Todo.findByIdAndDelete(id)
    .then(todo => {
      // success
      // if doc --> return doc, 200
      if (todo) {
        res.status(200).send({ todo });
      } else {
        // if not doc --> send 404
        res.status(404).send({ msg: "id is not found" });
      }
    })
    .catch(err => {
      // error
      // 400 with empty body
      res.status(400).send();
    });
});

app.patch("/todos/:id", (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ["text", "completed"]);

  if (!ObjectID.isValid(id)) {
    //validate the id --> not valid? --> return 404
    res.status(404).send({ msg: "Id is not valid" });
  }

  if (_.isBoolean(body.completed) && body.completed) {
    // milisecond timestand
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(
    id,
    {
      $set: body
    },
    { new: true }
  )
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.listen(port, () => {
  console.log(`started on port ${port}`);
});

module.exports = { app };
