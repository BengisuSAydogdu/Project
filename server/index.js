const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const config = require('./config.json');

let users = [];
let userCount = 0;

app.use(bodyParser.json());

app.get('/users', (req, res, next) => {
    res.send(users);
});

app.get('/users/:userId', (req, res, next) => {
    let userId = +req.params.userId;
    let user = users.find(user => user.id === userId);
    if (!user) {
        res.status(404);
        res.send({message: 'NOOO!!!'});
    } else {
        res.send(user);
    }
});

app.post('/users', (req, res, next) => {
    let body = req.body;

    if (!body || !body.name || !body.surname || !body.age) {
        res.status(417);
        res.send({message: 'NOOO!!!'});
    } else {
        let user = Object.assign({id: ++userCount}, req.body);
        users.push(user);
        res.send(user);
    }
});

app.put('/users/:userId', (req, res, next) => {
    let body = req.body;
    let userId = parseInt(req.params.userId);

    if (!userId || !body || !body.name || !body.surname || !body.age) {
        res.status(417);
        res.send({message: 'NOOO!!!'});
    } else {
        let user = Object.assign(req.body, {id: userId});
        let userIndex = users.findIndex(user => user.id === userId);
        users.splice(userIndex, 1, user);
        res.send(user);
    }
});

app.delete('/users/:userId', (req, res, next) => {
    let userId = parseInt(req.params.userId);
    users.splice(users.findIndex(user => user.id === userId), 1);
    res.send(true);
});

app.listen(config.port, () => {
    console.log(`***** Server is up & listening on port ${config.port}`);
});