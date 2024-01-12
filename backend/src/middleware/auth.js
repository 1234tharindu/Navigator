const jwt = require("jsonwebtoken");
require("dotenv").config();


const checkToken =async (req, res, next) => {

  const token = req.cookies.jwt; 

  if (!token) {
    
    return res.redirect("/login"); 
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.user = decoded.user; 
    next(); 
  } catch (err) {
    
    return res.redirect("/login"); 
  }
};








module.exports = {checkToken};