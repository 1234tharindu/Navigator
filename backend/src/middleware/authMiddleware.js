const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      }
      else {
        req.userId=decodedToken.userId;
        req.userRole = decodedToken.userRole;
        req.employeeNumber= decodedToken.username;
        next();
      }
      
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }

};

exports.adminAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, decodedToken) => {
      
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        if (decodedToken.userRole !== "Admin") {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

exports.userAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        if (decodedToken.userRole !== "User") {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};
exports.SuperAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        if (decodedToken.userRole !== "Super_Admin") {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};
