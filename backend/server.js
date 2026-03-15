const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const reviewRoutes = require("./routes/reviewRoutes");

const app = express();   // ← app created here

app.use(cors());
app.use(express.json());

/* serve node_modules for libraries */
app.use('/libs', express.static(path.join(__dirname, 'node_modules')));

/* API routes */
app.use("/api", reviewRoutes);

/* serve frontend */
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});