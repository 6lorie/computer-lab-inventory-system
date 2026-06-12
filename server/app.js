const express = require("express");

const cors = require("cors");

const equipmentRoutes = require("./routes/equipmentRoutes");

const authRoutes = require("./routes/authRoutes");

const app = express();

const borrowRoutes = require("./routes/borrowRoutes");

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/",(req, res) => {res.send("API Running");});

app.use("/api/equipment", equipmentRoutes);

app.use("/api/borrow", borrowRoutes);

module.exports = app;