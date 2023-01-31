const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Thing = require('./models/things');
const thingsRouter = require('./routes/things-route');
const usersRouter = require('./routes/users-route');

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// MONGO DB PASSWORD : ktaWElwzGjfpIuA1
// MONGO DB URL : mongodb+srv://saleh:<password>@cluster0.h2a0h.mongodb.net/?retryWrites=true&w=majority
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/classroom')
         .then(() => console.log('Mongo db connected.'))
         .catch((err) => console.error(err));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/stuff', thingsRouter);
app.use('/api/auth', usersRouter);

module.exports = app;