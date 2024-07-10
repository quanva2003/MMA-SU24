const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const createToken = (userId) => {
  const payload = {
    userId: userId,
  }

  const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "1h" });
  return token;
}

module.exports = {
  //endpoint for registration of the user
  RegisterUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(200).json({ message: "User registered successfully!" })
    } catch (error) {
      console.log("Error registering user!", error);
      res.status(500).json({ message: "Error registering the user!!!" })
    }
  },

  //endpoint for logging in of that particular user
  LoginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(404).json({ message: "Email and password are required!!" });
      }

      const user = await User.findOne({ email })
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      if (user.password !== password) {
        return res.status(404).json({ message: "Wrong password!" });
      }

      const token = createToken(user._id);
      res.status(200).json({ token });

    } catch (error) {
      console.log("Error in finding user", error);
      res.status(500).json({ message: "Internal Server Error!!!" })
    }
  },
}