const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  id:Number,
  gameTitle: String,
  publishedBy: String,
  yearOfRelease: Number,
  availablePlatforms: String,
  genre: String,
  description: String,
});

const GameModel = mongoose.model("Game", gameSchema);
module.exports = GameModel;
