const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", (req, res) => {
  console.log(req.body);
  const user = User(req.body); //User schema ko humne req.body de dii
  // hum jo bhi req se data send karenge thunderclient ke through
  //wo mongoDb ke User mai jaayega
  user.save();    // for saving the data in user 
  res.send(req.body);
});
module.exports = router;
