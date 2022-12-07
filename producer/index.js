const express = require('express');
const Redis = require('ioredis');
const redisClient = new Redis({ port: 6379, host: "127.0.0.1", password: "P@ssw0rd" });

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.status(200).json({ message: `Redis publisher active at port: ${PORT}` });
});

app.get('/publish', (req, res) => {
    const id = Math.floor(Math.random() * 10 + 1);
    const product = {
        id,
        name: `Product ${id}`,
    };

    redisClient.publish('products', JSON.stringify(product));
    res.send('Product published successfully!');
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));