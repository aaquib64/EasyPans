

const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("GEMINI KEY LOADED:", !!process.env.GEMINI_API_KEY);

const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-2.5-flash-lite",
];

async function generateWithFallback(prompt, imagePart = null) {
  for (const modelName of MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = imagePart
        ? await model.generateContent([prompt, imagePart])
        : await model.generateContent(prompt);

      return result.response.text();
    } catch (error) {
      // console.warn(`⚠️ ${modelName} failed`);
      console.warn(`⚠️ ${modelName} failed →`, error);

      if (modelName === MODELS.at(-1)) {
        if (error.message.includes("429")) {
          throw new Error("Free quota exceeded");
        }
        throw new Error("AI service unavailable");
      }
    }
  }
}

/* ================= LOGIC FUNCTIONS ================= */

const generateRecipeLogic = async (ingredients) => {
  const prompt = `
  You are an expert Indian Chef.
  User has these ingredients: ${ingredients}.
  Strictly return ONLY valid JSON:
  {
    "name": "",
    "description": "",
    "steps": [],
    "missingIngredients": []
  }`;

  const text = await generateWithFallback(prompt);
  return JSON.parse(text.replace(/```json|```/g, "").trim());
};

const identifyIngredientsLogic = async (fileBuffer, mimeType) => {
  const prompt =
    "Identify food ingredients in this image. Return ONLY comma-separated values.";

  const imagePart = {
    inlineData: {
      data: fileBuffer.toString("base64"),
      mimeType,
    },
  };

  return (await generateWithFallback(prompt, imagePart)).trim();
};

/* ================= EXPRESS CONTROLLERS ================= */

const generateRecipe = async (req, res) => {
  try {
    const { ingredients } = req.body;
    const data = await generateRecipeLogic(ingredients);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const identifyIngredients = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "Image required" });

    const data = await identifyIngredientsLogic(file.buffer, file.mimetype);

    res.json({ ingredients: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  generateRecipe,
  identifyIngredients,
};
