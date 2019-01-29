'use strict';
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {
    useNewUrlParser: true
}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');


    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2))
    })

    // Insert new doc into Users (name, age, location)
    db.collection('Users').insertOne({
        name: 'Thuy',
        age: 25,
        location: 'Viet Nam'
    }, (err, res) => {
        if (err) {
            return console.log('Unable to insert user', err);
        }

        console.log(res.ops[0]._id.getTimestamp());
    })

    client.close();
});