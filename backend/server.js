const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

// CONNECT DATABASE
connectDB();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Bike Showroom API Running");
});

const Part = require("./models/Part");
const Bike = require("./models/bike");
const bikeRoutes = require("./routes/bikeRoutes");
const partRoutes = require("./routes/partRoutes");
const authRoutes = require("./routes/authRoutes");

// Use Route
app.use("/api/bikes", bikeRoutes);
app.use("/api/parts", partRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

