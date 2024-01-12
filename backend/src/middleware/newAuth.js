const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, decodedToken) => {
      console.log(decodedToken.userRole);
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        req.userRole = decodedToken.userRole;
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


const permissionsData = {
  Admin: {
    permissions: [
      "View_attendance_records",
      "Generate_attendance_reports",
      "Delete_Users",
      "Create_Users",
      "Update_Users",
    ],
  },
  User: {
    permissions: ["Mark_attendance"],
  },
  super_admin: {
    permissions: ["Make_Admin", "Remove_Admin"],
  },
};

function generateToken(userData) {
  const expiresIn = "1h";

  const permission = jwt.sign(userData, process.env.JWT_SECRETKEY, {
    expiresIn,
  });

  return permission;
}

module.exports = { permissionsData, generateToken };