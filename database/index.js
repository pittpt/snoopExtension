//npm i express mongoose nodemon dotenv mongodb
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

const mongoString = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;

mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();

app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server Started at ${3000}`);
});
