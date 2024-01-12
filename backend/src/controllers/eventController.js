const { Op } = require("sequelize");
const Event = require("../models/Events");

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({ order: [["createdAt","DESC"]] });

    return res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const filterEvent = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const filterEvents = await Event.findAll({
      where: {
        date: { [Op.between]: [new Date(startDate), new Date(endDate)] },
      },
    });

    return res.json(filterEvents);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const createEvent = async (req, res) => {
  const { title, date, description } = req.body;
  console.log("Received Request Body:", req.body);

  try {
    if (!title || !date) {
      return res
        .status(400)
        .json({ error: "Title and date are required fields" });
    }

    const newEvent = await Event.create({
      title,
      date,
      description,
    });

    console.log("Event created successfully:", newEvent.toJSON());
    return res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).send("Server error");
  }
};

module.exports = { getAllEvents, createEvent, filterEvent };
