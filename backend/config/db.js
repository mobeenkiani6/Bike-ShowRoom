const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Atlas Connected");
  } catch (error) {
    console.error("Atlas connection failed:", error.message);
    // process.exit(1); // Continuing without DB for Chatbot functionality
  }
};

module.exports = connectDB;
