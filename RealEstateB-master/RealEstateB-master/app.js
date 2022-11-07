const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/route.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/",routes);

module.exports = app;