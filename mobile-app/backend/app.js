const express = require('express');
require('dotenv').config();
require('./models/db');
const userRouter = require('./routes/user');

const app = express();

app.use(express.json());
app.use(userRouter);

app.get('/test', (req, res) => {
    res.send('Hello world');
});

app.get('/', (req, res) => {
    res.json({ success: true, message:'welcome to backend zone'});
});

app.listen(8000, () => {
    console.log('port is listening');
});