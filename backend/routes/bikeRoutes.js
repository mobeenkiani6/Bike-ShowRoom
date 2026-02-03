const express = require("express");
const router = express.Router();
const Bike = require("../models/bike");

// ADD BIKE (Sell Bike)
router.post("/add", async (req, res) => {
  try {
    const bike = new Bike(req.body);
    await bike.save();
    res.status(201).json({ message: "Bike added successfully", bike });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET ALL BIKES
router.get("/", async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.json(bikes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
