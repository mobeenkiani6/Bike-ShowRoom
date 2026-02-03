const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userDetails: {
            name: { type: String, required: true },
            email: { type: String, required: true },
        },
        shippingAddress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            zip: { type: String, required: true },
        },
        items: [
            {
                partId: { type: mongoose.Schema.Types.ObjectId, ref: "Part" },
                name: String,
                price: Number,
                quantity: { type: Number, default: 1 },
            },
        ],
        totalPrice: { type: Number, required: true },
        paymentMethod: { type: String, required: true },
        status: { type: String, default: "Pending" },
    },
    { timestamps: true }
);

module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);
