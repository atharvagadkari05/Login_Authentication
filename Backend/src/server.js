const express = require("express");
const bcrypt = require("bcryptjs");
const swal = require("sweetAlert");
const path = require("path");
const env = require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./model/user");

// Mongoose Connection
mongoose.connect("mongodb://localhost:27017/loginauth", {
  useNewUrlParser: true,
  useUnifiedTopology: true, // these statement are used to get rid of the warnings while starting server.
});

// Express Connection
const app = express();

app.use(express.json());

app.post("/api/register", async (req, res) => {
  //console.log(req.body)

  const { username, password: PlainTextPass } = req.body; // Declaration of username and passsword

  //Usernaem check:
  if (!username || typeof username !== "string") {
    res.send({ status: "error", error: "Invalid Username" });
  }

  //Password check
  if (!username || typeof username !== "string") {
    res.send({ status: "error", error: "Invalid Username" });
  }
  const password = await bcrypt.hash(PlainTextPass, 11); // This is used to hash the password

  console.log(`your username is ${username} and password is ${password} `);

  try {
    const response = await User.create({
      username,
      password,
    });
    console.log(`Created Successfully ${response}`);
    res.status(200);
    swal("Created Succesfully");
  } catch (error) {
    // We know that duplicate username error code is 11000
    if (error.code === 11000) {
      res.send("Duplicate username Error");
    } else {
      console.log("Error");
    }
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = User.findOne(username);

  if (!user) {
    return res.json({ status: "error", error: "User Not found" });
  }

  if (await bcrypt.compare(password, User.password)) {
    // Successful Authentication
    const token = jwt.sign(
      {
        username: username,
        id: User._id,
      },
      process.env.JWT_SECRET
    );

    //    res.redirect('/home')
  }

  return res.json({ status: "error", error: "Failed Auth" });
});

app.listen(4000, () => {
  console.log("Listening at 4000");
});
