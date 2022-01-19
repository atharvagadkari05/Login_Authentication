const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require('cors')
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
app.use(cors())

app.use(express.json());

app.post("/api/register", async (req, res) => {
  try{
    console.log(req.body)
  const doc =   await User.create({
      name:req.body.name,
      password:req.body.password
    })
   await doc.save()
    
    
  res.json({
    "status": "ok"
})

}catch(err){
res.json({
  "status":"error", 
  "error": "Name already exists",
})
}
 
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = User.findOne(username);

  if (!user) {
    return res.json({ "status": "ok" });
  }else{
    return res.json({ "status": "error", "error": "User Not found" });

  }

  

});

app.listen(4000, () => {
  console.log("Listening at 4000");
});
