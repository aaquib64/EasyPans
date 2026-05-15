const Survey = require("../models/Survey");

exports.createSurvey = async (req, res) => {
  try {
    const survey = await Survey.create(req.body);

    res.status(201).json({
      success: true,
      message: "Survey submitted successfully",
      data: survey,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit survey",
      error: error.message,
    });
  }
};
