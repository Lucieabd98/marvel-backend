const express = require("express");
const router = express.Router();
const axios = require("axios");

const MARVEL_API_SECRET = process.env.MARVEL_API_SECRET;

// avoir tous les comics

router.get("/comics", async (req, res) => {
  try {
    title = req.query.title;

    let skipKey;

    if (req.query.page) {
      skipKey = (req.query.page - 1) * 100;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${MARVEL_API_SECRET}&title=${title}&skip=${skipKey}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// avoir tous les comics selon le personnage

router.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;
    // console.log(characterId);

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${MARVEL_API_SECRET}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// avoir les infos d'un seul comic

router.get("/comic/:comicId", async (req, res) => {
  try {
    const comicId = req.params.comicId;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${MARVEL_API_SECRET}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
