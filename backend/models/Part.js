const mongoose = require("mongoose");

const PartSchema = new mongoose.Schema(
  {
    partName: {
      type: String,
      required: true,
    },
    bikeModel: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Part || mongoose.model("Part", PartSchema);
