const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const user = require("../models/User");
const bcrypt = require('bcrypt')

// create a user using:Post "/api/auth/createuser" . No login required
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //if there are error's ,return bad request and the error's
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //checks whether the user with this email exists already
    try {
      let User = await user.findOne({ email: req.body.email });
      if (User) {
        return res
          .status(400)
          .json({ error: "sorry a user with this email already exist" });
      }
      
    //for generating salt 
    const salt=await bcrypt.genSalt(10);  // we have used await becz it returns a promise  
    //for generating hash
    const secPass=await bcrypt.hash(req.body.password,salt);
   

      //create a new user
      User = await user.create({
        name: req.body.name,
        password:secPass,
        email: req.body.email,
      });

      res.json({ User });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occures");
    }
  }
);
module.exports = router;
