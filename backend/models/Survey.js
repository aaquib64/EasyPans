const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: String,
    cookingFrequency: String,
    interests: [String],
    feedback: String,
    wantsEarlyAccess: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Survey", surveySchema);
