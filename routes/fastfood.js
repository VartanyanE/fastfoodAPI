const express = require("express");
const router = express.Router();
const Fastfood = require("../models/fastfood");

// Getting all
router.get("/", async (req, res) => {
  try {
    const fastfood = await Fastfood.find();
    res.json(fastfood);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getFastfood, (req, res) => {
  res.json(res.fastfood);
});

// Creating one
router.post("/", async (req, res) => {
  const fastfood = new Fastfood({
    name: req.body.name,
    location: req.body.location,
    popular: req.body.popular,
  });
  try {
    const newFastfood = await fastfood.save();
    res.status(201).json(newFastfood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch("/:id", getFastfood, async (req, res) => {
  if (req.body.name != null) {
    res.fastfood.name = req.body.name;
  }
  if (req.body.location != null) {
    res.fastfood.location = req.body.location;
  }
  if (req.body.popular != null) {
    res.fastfood.popular = req.body.popular;
  }
  try {
    const updatedFastfood = await res.fastfood.save();
    res.json(updatedFastfood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getFastfood, async (req, res) => {
  try {
    await res.fastfood.remove();
    res.json({ message: "Deleted Fastfood" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getFastfood(req, res, next) {
  let fastfood;
  try {
    fastfood = await Fastfood.findById(req.params.id);
    if (fastfood == null) {
      return res.status(404).json({ message: "Cannot find fastfood" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.fastfood = fastfood;
  next();
}

module.exports = router;
