
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



const recipeService = require("../services/recipe.service");
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