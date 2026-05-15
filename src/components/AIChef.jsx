 /*
 import { useState } from "react";
import axios from "axios"; // Make sure you have axios installed

const AIChef = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  // Replace with your actual Render Backend URL
  const BACKEND_URL =
    "[https://your-easypans-backend.onrender.com](https://your-easypans-backend.onrender.com)";

  const handleGenerate = async () => {
    if (!ingredients) return alert("Please enter ingredients!");

    setLoading(true);
    setRecipe(null);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/ai/generate`, {
        ingredients: ingredients,
      });

      setRecipe(response.data);
    } catch (error) {
      console.error(error);
      alert("Chef is busy! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-chef-container">
      <h2>👩‍🍳 EasyPans AI Chef</h2>
      <textarea
        placeholder="Enter ingredients (e.g., Paneer, Butter, Tomato)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Cooking..." : "Generate Recipe"}
      </button>

      {recipe && (
        <div className="recipe-card">
          <h3>{recipe.name}</h3>
          <p>{recipe.description}</p>
          <h4>Instructions:</h4>
          <ul>
            {recipe.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIChef;
*/

import { useState } from "react";
import axios from "axios";

const AIChef = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = "https://your-easypans-backend.onrender.com";

  const handleGenerate = async () => {
    if (!ingredients.trim()) {
      alert("Please enter ingredients!");
      return;
    }

    setLoading(true);
    setRecipe(null);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/ai/generate`, {
        ingredients,
      });

      setRecipe(response.data);
    } catch (error) {
      console.error(error);
      alert("Chef is busy! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <h2 className="mb-6 text-center text-2xl font-bold sm:text-3xl">
          👩‍🍳 EasyPans AI Chef
        </h2>

        {/* Input Card */}
        <div className="rounded-2xl border bg-white p-4 shadow-sm sm:p-6">
          <textarea
            placeholder="Enter ingredients (e.g., Paneer, Butter, Tomato)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={4}
            className="w-full resize-none rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black sm:text-base"
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-4 w-full rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-black/90 disabled:opacity-60 sm:text-base"
          >
            {loading ? "🍳 Cooking..." : "Generate Recipe"}
          </button>
        </div>

        {/* Recipe Result */}
        {recipe && (
          <div className="mt-6 rounded-2xl border bg-white p-4 shadow-sm sm:p-6">
            <h3 className="mb-2 text-xl font-semibold">
              {recipe.name}
            </h3>

            <p className="mb-4 text-sm text-muted-foreground sm:text-base">
              {recipe.description}
            </p>

            <h4 className="mb-2 font-medium">Instructions:</h4>

            <ul className="list-inside list-decimal space-y-2 text-sm sm:text-base">
              {recipe.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChef;
