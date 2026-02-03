const express = require("express");
const router = express.Router();
const Part = require("../models/Part");

// ADD PART (Admin)
router.post("/add", async (req, res) => {
  try {
    const part = new Part(req.body);
    await part.save();
    res.status(201).json({ message: "Part added successfully", part });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// BUY PART
router.post("/buy/:id", async (req, res) => {
  const partId = req.params.id;
  const quantity = req.body.quantity || 1; // default buy 1

  try {
    const part = await Part.findById(partId);
    if (!part) {
      return res.status(404).json({ message: "Part not found" });
    }

    if (part.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    part.stock -= quantity;
    await part.save();

    res.json({ message: `Purchased ${quantity} ${part.partName}(s) successfully`, part });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SMART SEARCH (AUTOMATION)
router.get("/search", async (req, res) => {
  const keyword = req.query.q;

  try {
    const results = await Part.find({
      stock: { $gt: 0 }, // only show available stock
      $or: [
        { partName: { $regex: keyword, $options: "i" } },
        { bikeModel: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
      ],
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// RECOMMENDATIONS (AUTOMATION)
router.get("/recommendations", async (req, res) => {
  try {
    // For now, return random 5 parts in stock
    const recommendations = await Part.aggregate([
      { $match: { stock: { $gt: 0 } } },
      { $sample: { size: 5 } },
    ]);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
