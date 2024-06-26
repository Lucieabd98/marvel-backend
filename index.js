require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

//Sign Up routes
const signUpRoutes = require("./routes/user");
app.use(signUpRoutes);

// Comics routes
const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

// Characters routes
const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

app.get("/", (req, res) => {
  try {
    console.log("coucou");
    res.status(200).json({ message: "coucou" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started 🚀");
});
