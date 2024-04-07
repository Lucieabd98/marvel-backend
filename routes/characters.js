const express = require("express");
const router = express.Router();
const axios = require("axios");

const MARVEL_API_SECRET = process.env.MARVEL_API_SECRET;

// avoir tous les personnages, page principale

router.get("/characters", async (req, res) => {
  try {
    // console.log(req.query.name);
    characterName = req.query.name;

    let skipKey;

    if (req.query.page) {
      skipKey = (req.query.page - 1) * 100;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${MARVEL_API_SECRET}&name=${characterName}&skip=${skipKey}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${MARVEL_API_SECRET}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
