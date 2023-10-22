const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
require("dotenv").config();

const Prompt = require("./models/prompt");

const uri = process.env.MONGODB_URI; // || "mongodb://127.0.0.1:27017/myDatabase"; //This is my MongoDB connection string

//parse JSON request body
app.use(express.json());

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

// POST: Add a new prompt
app.post("/prompts", async (req, res) => {
  try {
    const prompt = new Prompt(req.body);
    await prompt.save();
    res.status(201).send(prompt);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/prompts", async (req, res) => {
  try {
    const prompts = await Prompt.find({});
    res.status(200).send(prompts);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET: Retrieve a random prompt
app.get("/prompts/random", async (req, res) => {
  try {
    const count = await Prompt.countDocuments();
    const random = Math.floor(Math.random() * count);
    const prompt = await Prompt.findOne().skip(random);
    res.status(200).send(prompt);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/", (req, res) => {
  res.send("Hello world");
});
