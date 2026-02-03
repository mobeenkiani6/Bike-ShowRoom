const mongoose = require("mongoose");

const BikeSchema = new mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    mileage: { type: Number, required: true },
    price: { type: Number, required: true },
    condition: { type: String, default: 'Used' },
    description: { type: String },
    image: { type: String }, // URL to image
    sellerName: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Bike || mongoose.model("Bike", BikeSchema);
