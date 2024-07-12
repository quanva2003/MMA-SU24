const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const createToken = (user) => {
  const payload = {
    user,
  };

  const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "1h" });
  return token;
};

module.exports = {
  // Endpoint for registration of the user
  RegisterUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(200).json({ message: "User registered successfully!" });
    } catch (error) {
      console.log("Error registering user!", error);
      res.status(500).json({ message: "Error registering the user!!!" });
    }
  },

  // Endpoint for logging in of that particular user
  LoginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(404)
          .json({ message: "Email and password are required!!" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      if (user.password !== password) {
        return res.status(404).json({ message: "Wrong password!" });
      }

      const token = createToken(user);
      res.status(200).json({ token });
    } catch (error) {
      console.log("Error in finding user", error);
      res.status(500).json({ message: "Internal Server Error!!!" });
    }
  },

  // Endpoint for finding a user by email
  findUserByEmail: async (req, res) => {
    try {
      const { email } = req.params;

      if (!email) {
        return res.status(400).json({ message: "Email is required!" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.log("Error finding user by email", error);
      res.status(500).json({ message: "Internal Server Error!!!" });
    }
  },

  updateUserByEmail: async (req, res) => {
    try {
      const { email } = req.params;
      const updates = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required!" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      const result = await User.findOneAndUpdate(
        {
          email: email,
        },
        updates,
        { new: true }
      );

      return res.status(200).json({
        message: "Successfully updated user.",
        result,
      });
    } catch (error) {
      console.log("Error finding user by email", error);
      res.status(500).json({ message: "Internal Server Error!!!" });
    }
  },
};
