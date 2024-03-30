const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const port = 8000;

const { User, hashPassword } = require("./Model/UserSchema");

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

const app = express();
const routes = require("./routes");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.send("Connected to MongoDB Successfully✅");
  } else {
    res.send("Did not connect to MongoDB");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing credentials" });
    }

    let user = await User.findOne({ $or: [{ username }, { email }] });

    if (user) {
      const hashedPassword = hashPassword(password, user.salt);
      if (user.password !== hashedPassword) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
    } else {
      user = new User({ username, email, password });
      await user.save();
    }

    const token = 'dummytoken';

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.json({ message: "Login successful", token: token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/check-login", (req, res) => {
  const token = req.cookies.token;

  if (token) {
    res.json({ isLoggedIn: true });
  } else {
    res.json({ isLoggedIn: false });
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

app.use("/api", routes);

module.exports = app;
