const express = require('express');
const { doSomeHeavyStuff } = require('./util');

const app = express();
const PORT = 3000;

// prometheus client 
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics

collectDefaultMetrics({
    register: client.register,
})

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: err.message
    });
}

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello from the server!'
    });
});

app.get('/slow', async (req, res, next) => {
    try {
        const ms = await doSomeHeavyStuff();
        res.status(200).json({
            message: `The request took ${ms}ms to complete`
        });
    } catch (err) {
        next(err);
    }
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType)
    const metrics = await client.register.metrics()

    res.send(metrics)
})


app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
