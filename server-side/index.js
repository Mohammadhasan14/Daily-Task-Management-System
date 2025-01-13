const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const taskRoutes = require("./routes/taskRoutes");

app.use(express.json());
app.use(cors());

const mongoUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/task_manager"; 
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};
connectDB();

app.use("/api/tasks", taskRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Backend is running on port ${port}`);
});
