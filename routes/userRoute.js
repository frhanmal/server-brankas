const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const user = await newUser.save();
    console.log(user);
    res.send("User Register Sucesfuly");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        res.send(user);
      } else {
        return res.status(400).json({ message: "Wrong Password" });
      }
    } else {
      return res.status(400).json({ message: "Email not found" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
