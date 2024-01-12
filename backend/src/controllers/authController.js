const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateTokens } = require("../tokenUtils");
const nodemailer = require("nodemailer");
const PasswordHistory = require("../models/Password");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const condition = /^\d+$/.test(username)
      ? { employeeNumber: username }
      : { email: username };

    const user = await User.findOne({
      where: condition,
    });

    if (!user) {
      return res.status(401).json({
        message: "Login not successful",
        error: "Invalid username or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const { accessToken } = generateTokens(user);

    const maxAge = 3 * 60 * 60;

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("An error occurred:", error);

    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
async function forgotPassword(req, res) {
   
  const { employeeNumber } = req.body;
  try {
    
    const user = await User.findOne({ where: { employeeNumber } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dinukanisheda9@gmail.com",
        pass: "elbu hxlj indb grpa",
      },
      secure: true,
      tls: {
        rejectUnauthorized: false,
      },
    });

    const sendVerificationCode = async (email, code) => {
      try {
        const mailOptions = {
          from: "dinukanisheda9@gmail.com",
          to: email,
          subject: "**Verification Code**",
          html: `
        <div style="background-color: #1B4242; color: #ffffff; padding: 10px; border-radius: 5px;">
          <p style="font-weight: bold;">Your verification code is:</p>
          <p style="font-weight: bold; font-size: 16px; color: #ffffff;">${code}</p>
        </div>
      `,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("Email sent: " + info.response);
        return true;
      } catch (error) {
        console.error("Error sending email:", error);
        return false;
      }
    };

    const emailFirstLetter = user.email.split("@")[0].slice(0, 1);
    const emailLastLetter = user.email.split("@")[0].slice(-1);
    const emailDomain = user.email.split("@")[1];
    const hiddenEmail =
      emailFirstLetter + "********" + emailLastLetter + "@" + emailDomain;

    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    user.verificationCode = verificationCode;

    sendVerificationCode(user.email, verificationCode)
      .then(async (success) => {
        if (success) {
          console.log("Verification code sent successfully!");
          const verificationCodeExpiration = new Date(
            Date.now() + 5 * 60 * 1000
          );
          user.verificationCodeExpiration = verificationCodeExpiration;
          await user.save();
          res.json({ data: { email: hiddenEmail } });
        } else {
          console.log("Failed to send verification code.");
          res
            .status(500)
            .json({ message: "Failed to send verification code." });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function submitVerficationCode(req, res) {
  const { employeeNumber, verificationCode } = req.body;

  try {
    const user = await User.findOne({
      where: { employeeNumber },
      include: [{ model: PasswordHistory, attributes: ["password"] }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      user.verificationCode != verificationCode ||
      user.verificationCodeExpiration.getTime() < new Date().getTime()
    ) {
      return res
        .status(401)
        .json({ message: "Invalid or expired verification code" });
    }

    user.verificationCode = null;
    user.verificationCodeExpiration = null;
    await user.save();

    res.json({ message: "Verification code verified" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function resetPassword(req, res) {
  const { employeeNumber, password } = req.body;

  try {
    const user = await User.findOne({
      where: { employeeNumber },
      include: [{ model: PasswordHistory, attributes: ["password"] }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const passwordHistory = user.PasswordHistories.map(
      (pHistory) => pHistory.dataValues.password
    );

    const isPasswordUsedBefore = passwordHistory.some((oldPassword) =>
      bcrypt.compareSync(password, oldPassword)
    );
    if (isPasswordUsedBefore) {
      return res
        .status(401)
        .json({ message: "New password cannot be one of the last passwords." });
    }

    user.password = hashedPassword;
    await user.save();
    await PasswordHistory.create({ password: hashedPassword, userId: user.id });

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const deleteUserByEmployeeNumber = async (req, res) => {
  const { employeeNumber } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ employeeNumber });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  login,
  logout,
  forgotPassword,
  submitVerficationCode,
  resetPassword,
  deleteUserByEmployeeNumber,
};
