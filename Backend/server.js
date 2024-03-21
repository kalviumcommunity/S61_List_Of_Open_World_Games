const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser");
const port = 8000;

const mongoUri = process.env.MONGODB_URI;
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(express.json());
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.send("Connected to MongoDB Successfully✅");
  } else {
    res.send("Did not connect to MongoDB");
  }
});

app.use("/api", routes);

module.exports = app;
