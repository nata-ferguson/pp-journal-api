const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
require("dotenv").config();

const uri = process.env.MONGODB_URI; // || "mongodb://127.0.0.1:27017/myDatabase"; //This is my MongoDB connection string

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");

    app.listen(PORT, () => {
      console.log(`server started on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
