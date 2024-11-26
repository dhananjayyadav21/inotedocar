const express = require("express");
const User = require("../models/User");
const { Mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const middlewarw = require('../middleware/fetchuser');


const router = express.Router();
const AUTHTOKEN_SECRATE = process.env.AUTHTOKEN_SECRATE;
//====================== Route 1: create user using POST: api/auth/createuser no login =============================
router.post(
  "/createuser",
  //============= new user validation for use data storing
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],

  async (req, res) => {
    //=============== if there are errors accrued shoe bad request and errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
      success = false;
      return res.send({success, errors: result.array() });
    }

    //=========== if user allrady exsist with this email
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res.status(400).json({success, error: "Aleady resiter this Email" });
      }

      const reqUser = req.body;
      //======= bcrypt authentication for sequrity purpose using hash and salt
      const Salt = await bcrypt.genSalt(10);
      const sPasword = await bcrypt.hash(reqUser.password, Salt);

      user = await User.create({
        name: reqUser.name,
        email: reqUser.email,
        password: sPasword,
      });

      //========== JWT authentication for Token provide user

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, AUTHTOKEN_SECRATE);
      success = true; 
      res.json({success, authToken });
      //====== if accrued internal server error show error
    } catch (error) {
      res.status(500).send("some internal server error accrued");
    }
  }
);

//========================= Route 2: user login using POST: api/auth/login =========================================
router.post(
  "/login",

  //=== new user validation
  [body("email").isEmail(), body("password").exists()],

  async (req, res) => {
    //===== if there are errors accrued bad request and errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
      success = false;
      return res.send({success, errors: result.array() });
    }

    const { email, password } = req.body;

    try {
      //====== check user email exist or not
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({success,  error: "Plese try to login with correct credentials" });
      }

      //====== check user password correct or not
      const PasswordCompare = await bcrypt.compare(password, user.password);
      if (!PasswordCompare) {
        success = false;
        return res
          .status(400)
          .json({success, error: "Plese try to login with correct credentials" });
      }

      //===== JWT authentication for Token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, AUTHTOKEN_SECRATE);
      success = true;
      res.json({success, authToken });

      //====== if error accrued in internal server
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some internal server error accrued");
    }
  }
);

//================== Route 3: Get user login Detail POST: api/auth/getUser ''login required  ===========================
router.post('/getuser', middlewarw, async (req,res)=>{
    try {
      //====== find user from datbase using user id 
     let userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);

    } catch (error) {
      console.log(error.message);
      res.status(500).send("some internal server error accrued");
    }
});

module.exports = router;
