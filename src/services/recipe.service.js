const Recipe = require("../models/recipe.model");

// --- Business logic lives here, controllers stay thin ---

const getAllRecipes = async (categoryFilter) => {
  // Build a query object only if a category filter was passed in
  const query = categoryFilter ? { category: categoryFilter } : {};
  const recipes = await Recipe.find(query).sort({ createdAt: -1 });
  return recipes;
};

const getRecipeById = async (recipeId) => {
  const recipe = await Recipe.findById(recipeId);
  return recipe; // Returns null if not found — controller handles the 404
};

const createRecipe = async (recipeData) => {
  // Validate that cookingTime is a positive number (business rule)
  if (recipeData.cookingTime <= 0) {
    throw new Error("Cooking time must be a positive number");
  }

  const newRecipe = new Recipe(recipeData);
  const savedRecipe = await newRecipe.save();
  return savedRecipe;
};

const updateRecipe = async (recipeId, updates) => {
  // Validate cookingTime if it's being updated
  if (updates.cookingTime !== undefined && updates.cookingTime <= 0) {
    throw new Error("Cooking time must be a positive number");
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(
    recipeId,
    updates,
    {
      new: true,          // Return the updated document, not the old one
      runValidators: true, // Re-run schema validators on the updated fields
    }
  );

  return updatedRecipe; // Returns null if ID not found — controller handles the 404
};

const deleteRecipe = async (recipeId) => {
  const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
  return deletedRecipe; // Returns null if ID not found — controller handles the 404
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
