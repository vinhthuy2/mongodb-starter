'use strict';
// const MongoClient = require('mongodb').MongoClient;
const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {
    useNewUrlParser: true
}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5c3df00c9c615415a189b873')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('unable to fetch todos', err)
    // });

    // db.collection('Todos').find().count((err, count) => {
    //     if (err) {
    //         return console.log(err);
    //     }

    //     console.log(`count ${count}`);
    // });

    db.collection('Users').find({name: "Thuy"}).toArray()
        .then((docs) => {
            console.log(JSON.stringify(docs, undefined, 2))
        })
    client.close();
});