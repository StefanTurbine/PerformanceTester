const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('HelloWorld');
});

app.listen(3000, () => {
    console.log("Hello World on Port 3000");
});