const { Router } = require("express");
const router = Router();
const {
  login,
  logout,
  forgotPassword,
  resetPassword,
  submitVerficationCode,
} = require("../controllers/authController");
const userController = require("../controllers/userController");
const { uploadImage } = require("../middleware/uploadImage");
const { auth } = require("../middleware/authMiddleware");
const {
  permissionsData,
  generateToken,
} = require("../controllers/permissionController");
const attendanceController = require("../controllers/attendanceController");
const leavesController = require("../controllers/leavesController");
const permissionController = require("../controllers/permissionController");
const eventController = require("../controllers/eventController");
const liabilityController = require("../controllers/laibilityController");
const financialDataContoller = require("../controllers/financialDataContoller");
const { checkToken } = require("../middleware/auth");

router.post("/register", uploadImage, (req, res) => {
  userController.registerUser(req, res);
});

router.post("/login", login, (req, res) => {
  res.json({ message: "Login successful" });
});

router.post("/logout", logout, (req, res) => {
  res.json({ message: "Logout successful" });
});

router.post("/sendVerificationCode", forgotPassword, (req, res) => {
  res.json({ message: "forgot password successful" });
});

router.post(
  "/submitVerificationCode",
  
  submitVerficationCode,
  (req, res) => {
    res.json({ message: "verification code verified successful" });
  }
);

router.post("/resetPassword", resetPassword, (req, res) => {
  res.json({ message: " resetPassword password successful" });
});
router.get("/auth", checkToken, async (req, res) => {
  res.render("home");
});

router.get("/permissions/authnew", auth, async (req, res) => {
  const permissions = permissionController.permission(
    permissionsData[req.userRole]
  );
  res.send({ permissions });
});
router.get("/profile", auth, async (req, res) => {
  userController.getRegisteredUserDetails(req, res);
});
router.get("/profile/picture", auth, async (req, res) => {
  userController.getRegisteredUserProfilePicture(req, res);
});

router.post("/attendence-add", auth, attendanceController.addAttendance);
router.get("/attendance", auth, attendanceController.getAttendance);

// router.post("/leaves-add", async (req, res) => {
//   leavesController.addLeaves(req, res);
// });

router.get("/leaves", auth, async (req, res) => {
  leavesController.getLeaves(req, res);
});

router.get("/events", async (req, res) => {
  eventController.getAllEvents(req, res);
});
router.post("/events-create", async (req, res) => {
  eventController.createEvent(req, res);
});

router.get("/liabilities", auth, async (req, res) => {
  liabilityController.getLiabilities(req, res);
});
router.get("/Earning", auth, async (req, res) => {
  financialDataContoller.getFinanceData(req, res);
});
router.get("/deduction", auth, async (req, res) => {
  financialDataContoller.getFinanceData(req, res);
});
router.get("/budget", auth, async (req, res) => {
  financialDataContoller.getFinanceData(req, res);
});

module.exports = router;
