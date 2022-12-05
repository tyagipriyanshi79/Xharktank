const mongoose = require("mongoose");

const PitchesSchema = new mongoose.Schema({
  created_at: { type: Date, required: true, default: Date.now },
  entrepreneur: String,
  pitchTitle: String,
  pitchIdea: String,
  askAmount: Number,
  equity: Number,
  offers: [],
});

PitchesSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Pitches", PitchesSchema);
