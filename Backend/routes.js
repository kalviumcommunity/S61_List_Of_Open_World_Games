const express = require("express");
const router = express.Router();
const GameModel = require("./Model/model");
const entitySchema = require("./Model/entitySchema");

router.post("/add", async (req, res) => {
  const gameData = req.body;
  const { error } = entitySchema.validate(gameData);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const insertedGames = await GameModel.insertMany(gameData);
    res
      .status(201)
      .json({ message: "Games data posted successfully", data: insertedGames });
  } catch (error) {
    console.error("Error posting data:", error);
    res.status(500).json({ error: "Unable to post data" });
  }
});

router.get("/data", async (req, res) => {
  try {
    const data = await GameModel.find();
    res.json({ message: "Data fetched successfully", data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Unable to fetch data" });
  }
});

router.delete("/remove/:id", async (req, res) => {
  const gameId = req.params.id;

  try {
    const deletedGame = await GameModel.findByIdAndDelete(gameId);
    if (!deletedGame) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json({ message: "Game deleted successfully", data: deletedGame });
  } catch (error) {
    console.error("Error deleting game:", error);
    res.status(500).json({ error: "Unable to delete game" });
  }
});

router.put("/update/:id", async (req, res) => {
  const gameId = req.params.id;
  const updatedGameData = req.body;
  const { error } = entitySchema.validate(updatedGameData);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const updatedGame = await GameModel.findByIdAndUpdate(
      gameId,
      updatedGameData,
      { new: true }
    );
    if (!updatedGame) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json({ message: "Game updated successfully", data: updatedGame });
  } catch (error) {
    console.error("Error updating game:", error);
    res.status(500).json({ error: "Unable to update game" });
  }
});

module.exports = router;
