const Leaves = require("../models/Leaves");

const leavesController = {
  addLeaves: async (req, res) => {
    try {
      const { LeaveType, Total, employeeNumber } = req.body;

      if (!employeeNumber) {
        return res
          .status(400)
          .json({ error: "employeeNumber parameter is missing" });
      }

      const newLeaves = await Leaves.create({
        LeaveType,
        Total,
        employeeNumber,
      });

      res.status(201).json({ data: newLeaves });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  },

  getLeaves: async (req, res) => {
    try {
      const employeeNumber = req.employeeNumber;
      const LeavesRecords = await Leaves.findAll({
        where: { employeeNumber },
        attributes: ["Type", "Total", "Date"],
      });

      res.json({ data: LeavesRecords });
    } catch (error) {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  },
};

module.exports = leavesController;
