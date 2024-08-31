const Recipe = require("../models/Recipe");

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createRecipe = async (req, res) => {
  const imagePath = req.file ? req.file.path : null;

  const { title, ingredients, instructions, category } = req.body;

  if (!title || !ingredients || !instructions || !category) {
    console.error("Validation Error:", {
      title,
      ingredients,
      instructions,
      category,
    });
    return res.status(400).json({ message: "All fields are required" });
  }

  const recipe = new Recipe({
    title,
    ingredients: ingredients.split(",").map((item) => item.trim()),
    instructions,
    category,
    image: imagePath,
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    console.error("Error saving recipe:", err);
    res.status(400).json({ message: err.message });
  }
};
