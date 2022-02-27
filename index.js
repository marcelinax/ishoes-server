const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const config = require('./config');
const fileUpload = require('express-fileupload');

const app = express();


app.use(cors());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

mongoose.connect(config.dbConnect, () => console.log('Connected...'));


app.use(express.json());
app.use(require('./routes'));


app.listen(config.port, () => console.log('Start...'));