const express = require("express");

const cors = require("cors");

const equipmentRoutes = require("./routes/equipmentRoutes");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/",(req, res) => {res.send("API Running");});

app.use("/api/equipment", equipmentRoutes);

module.exports = app;