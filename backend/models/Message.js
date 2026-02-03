const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        bikeId: { type: mongoose.Schema.Types.ObjectId, ref: "Bike" },
        bikeModel: { type: String }, // redundant but useful for quick display
        senderName: { type: String, required: true },
        senderEmail: { type: String, required: true }, // Optional if user is logged in
        message: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.models.Message || mongoose.model("Message", MessageSchema);
