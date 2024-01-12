const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateTokens(user, rememberMe = false) {
  const accessTokenExpiresIn = rememberMe ? "30d" : "3h";
  const refreshTokenExpiresIn = rememberMe ? "30d" : "1d";

  const accessToken = jwt.sign(
    {
      userId: user.id,
      username: user.employeeNumber,
      userRole: user.role,
      name: user.name,
      image: user.imagePath ? true : false,
      email:user.email
    },
    process.env.JWT_SECRETKEY,
    { expiresIn: accessTokenExpiresIn }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRETKEY,
    { expiresIn: refreshTokenExpiresIn }
  );

  return { accessToken, refreshToken };
}

module.exports = { generateTokens };
