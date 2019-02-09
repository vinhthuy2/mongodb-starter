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

// POST /users
app.post("/users", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);
  var user = new User(body);
  user
    .save()
    .then(doc => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header("x-auth", token).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

// GET /users
app.get("/users", (req, res) => {
  User.find().then(
    users => {
      res.send({ users });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

// GET /users/:id
app.get("/users/:id", (req, res) => {
  var id = req.params.id;

  // validate id by ObjectID isValid
  // 404 was not found - send back empty body
  if (!ObjectID.isValid(id)) {
    res.status(404).send({ msg: "Id is not valid" });
    return console.log("the id is invalid");
  }

  User.findById(id)
    .then(user => {
      if (user) {
        res.send({ user });
      } else {
        res.status(404).send();
      }
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

// DELETE /users/:id
app.delete("/users/:id", (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send({ msg: "Id is not valid" });
    return console.log("the id is invalid");
  }

  User.findByIdAndDelete(id)
    .then(user => {
      if (user) {
        res.send({ user });
      } else {
        res.status(404).send();
      }
    })
    .catch(e => {
      res.status(400).send();
    });
});

// PATCH /users/:id
app.patch("/users/:id", (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ["email", "password"]);

  if (!ObjectID.isValid(id)) {
    //validate the id --> not valid? --> return 404
    res.status(404).send({ msg: "Id is not valid" });
  }

  User.findByIdAndUpdate(
    id,
    {
      $set: body
    },
    { new: true }
  )
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }

      res.send({ user });
    })
    .catch(e => {
      res.status(400).send();
    });
});

////////////////////////////////////////////////////////////////

// POST /todos
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

// GET /todos
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

// DELETE /todos/123554
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

// PATCH /todos/:id
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
