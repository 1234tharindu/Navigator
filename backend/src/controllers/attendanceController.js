const Attendance = require("../models/Attendance");

const attendanceController = {
  addAttendance: async (req, res) => {
    const { Date, InTime, OutTime } = req.body;

    try {
      const newAttendance = await Attendance.create({
        Date,
        InTime,
        OutTime,
      });

      console.log("Attendance added:", newAttendance);

      res.redirect("/attendance");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  getAttendance: async (req, res) => {
    try {
      const employeeNumber = req.employeeNumber;

      if (!employeeNumber) {
        return res
          .status(400)
          .json({ error: "employeeNumber parameter is missing" });
      }
      const attendanceRecords = await Attendance.findAll({
        where: { employeeNumber },
        attributes: ["Date", "InTime", "OutTime"],
      });
      res.status(200).json({ data: attendanceRecords });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = attendanceController;
