const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const config = require('./config');

const app = express();


app.use(cors());

mongoose.connect(config.dbConnect, () => console.log('Connected...'));


app.use(express.json());
app.use(require('./routes'));


app.listen(config.port, () => console.log('Start...'));