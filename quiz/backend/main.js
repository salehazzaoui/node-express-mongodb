
const express = require('express');
const mongoose = require('mongoose');
const ProductRouter = require('./routes/products-route');

const port = process.env.PORT || 3000
const app = express();
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/classroom')
        .then(() => console.log('Mongo DB connected.'))
        .catch((e) => console.error(e))

app.use('/api/products', ProductRouter);

app.get('/', (req, res) => {
    res.send('server is running');
});

app.listen(port, () => console.log(`server is running on http://localhost:${port}`));