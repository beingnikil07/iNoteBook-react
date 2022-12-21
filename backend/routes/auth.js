const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const user = require("../models/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const JWT_SECRET = "nikkiisagoodb$y";

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
      const salt = await bcrypt.genSalt(10); // we have used await becz it returns a promise
      //for generating hash
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      User = await user.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        User: {
          id: User.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      //res.json({ User });
      res.json({ authtoken }); //returning authtoken as a response
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// Authenticate a user using:Post "/api/auth/login" . No login required

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    //if there are error's ,return bad request and the error's
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; // here we are distructuring and out the password and email from req.body
    try {
      let User = await user.findOne({ email });
      if (!User) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credientials" });
      }
      const passwordCompare = await bcrypt.compare(password, User.password);

      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credientials" });
      }

      const data = {
        User: {
          id: User.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
