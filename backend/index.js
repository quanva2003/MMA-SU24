const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
const port = 8000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require("jsonwebtoken");

mongoose.connect("mongodb+srv://dangnse173237:dangnse173237@cluster0.6nq3nal.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "MobileApp"
  }
).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log("Error connecting to MongoDB", err);
});

app.listen(port, () => {
  console.log("Server running on port 8000");
});

const User = require("./models/user");

//endpoint for registration of the user
app.post("/register", (req, res) => {
  const { name, email, password, image } = req.body;

  const newUser = new User({ name, email, password, image })

  newUser.save().then(() => {
    res.status(200).json({ message: "User registered successfully!" })
  }).catch((err) => {
    console.log("Error registering user!", err);
    res.status(500).json({ message: "Error registering the user!!!" })
  })
})

//function to create a token for the user
const createToken = (userId) => {
  const payload = {
    userId: userId,
  }

  const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "1h" });
  return token;
}

//endpoint for logging in of that particular user
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({ message: "Email and password are required!!" });
  }

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.password !== password) {
      return res.status(404).json({ message: "Wrong password!" });
    }

    const token = createToken(user._id);
    res.status(200).json({ token });
  }).catch((error) => {
    console.log("Error in finding user", error);
    res.status(500).json({ message: "Internal Server Error!!!" })
  })
})
