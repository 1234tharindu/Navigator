const jwt = require("jsonwebtoken");
require("dotenv").config();

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

const permission=function generateToken(userData) {
  const expiresIn = "1h";

  const permission = jwt.sign(userData, process.env.JWT_SECRETKEY, {
    expiresIn,
  });

  return permission;
}

module.exports = { permissionsData, permission };
