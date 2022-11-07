const express = require('express');
const mongoose = require("mongoose");
const app = require("./app.js");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL).then(()=>(console.log("mongodb database connected successfully")));

let port = process.env.PORT || 3000
app.listen(port,()=>(console.log("port running successfully in 3500.....")));