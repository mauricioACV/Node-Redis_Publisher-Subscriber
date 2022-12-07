const express = require('express');
const Redis = require('ioredis');
const redisClient = new Redis({ port: 6379, host: '127.0.0.1', password: 'P@ssw0rd' });

const app = express();
const PORT = process.env.PORT || 3002;

let products = [];

redisClient.on('message', (channel, message) => {
    products.push(JSON.parse(message));
});

redisClient.subscribe('products');

app.get('/', (req, res) => {
    res.status(200).json({ message: `Redis subscriber active at port: ${PORT}` });
});

app.get('/subscribe', (req, res) => res.status(200).json(products));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));