const recipeService = require("../services/recipe.service");

const createRecipe = async (req, res, next) => {
  try {
    const newRecipe = await recipeService.createRecipe(req.body);

    res.status(201).json({
      status: "success",
      message: "Recipe created successfully",
      data: newRecipe,
    });
  } catch (error) {
    next(error);
  }
};

const getAllRecipes = async (req, res, next) => {
  try {
    const { category } = req.query;
    const recipes = await recipeService.getAllRecipes(category);

    res.status(200).json({
      status: "success",
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    next(error); 
  }
};


const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);

    if (!recipe) {
      
      const error = new Error(`Recipe with ID ${req.params.id} is not found try again`);
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      status: "success",
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};





const updateRecipe = async (req, res, next) => {
  try {
    const updatedRecipe = await recipeService.updateRecipe(
      req.params.id,
      req.body
    );

    if (!updatedRecipe) {
      const error = new Error(`Recipe with ID ${req.params.id} is not found try again`);
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      status: "success",
      message: "Recipe updated successfully",
      data: updatedRecipe,
    });
  } catch (error) {
    next(error);
  }
};


const deleteRecipe = async (req, res, next) => {
  try {
    const deletedRecipe = await recipeService.deleteRecipe(req.params.id);

    if (!deletedRecipe) {
      const error = new Error(`Recipe with ID ${req.params.id} is not found try again`);
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      status: "success",
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteAllRecipes = async (req, res, next) => {
  try {
    const deleteAllRecipes = await recipeService.deleteAllRecipes();
    if (!deleteAllRecipes) {
      const error = new Error(`No recipes found to delete`);
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      status: "success",
      message: "All recipes deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  deleteAllRecipes,
};
