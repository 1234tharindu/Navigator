const Liability = require("../models/Laibilities");

const liabilitiesController = {
  getLiabilities: async (req, res) => {
    try {
      const employeeNumber = req.employeeNumber;

      if (!employeeNumber) {
        return res
          .status(400)
          .json({ error: "employeeNumber parameter is missing" });
      }

      const liabilities = await Liability.findAll({
        where: { employeeNumber },
        attributes: {
          exclude: ["id", "createdAt", "updatedAt", "employeeNumber"],
        },
      });

      res.status(200).json({ data: liabilities });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = liabilitiesController;
