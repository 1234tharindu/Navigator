const bcrypt = require("bcrypt");
const User = require("../models/User"); 
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.TOKEN_KEY; 

async function loginUser(req, res, next) {
  const { employeeNumber, password, rememberMe } = req.body;

  try {
   
    const user = await User.findOne({ where: { employeeNumber } });
    //401 — Unauthorized
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const expiresIn = rememberMe ? "7d" : "1h";
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn });

   
    res.locals.token = token;
    res.locals.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error authenticating user" });
  }
}

module.exports = loginUser;
