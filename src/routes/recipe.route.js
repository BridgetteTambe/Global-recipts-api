const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Recipe title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
    },

    ingredients: {
      type: [String],
      required: [true, "Ingredients are required"],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "A recipe must have at least one ingredient",
      },
    },

    instructions: {
      type: String,
      required: [true, "Cooking instructions are required"],
      trim: true,
    },

   
    cookingTime: {
      type: Number,
      required: [true, "Cooking time is required"],
      min: [1, "Cooking time must be at least 1 minute"],
    },

    difficulty: {
      type: String,
      required: [true, "Difficulty level is required"],
      enum: {
        values: ["Easy", "Medium", "Hard"],
        message: "Difficulty must be Easy, Medium, or Hard",
      },
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: {
        values: [
          "Breakfast",
          "Lunch",
          "Dinner",
          "Dessert",
          "Snack",
          "Appetizer",
          "Drink",
        ],
        message: "Invalid category",
      },
    },
  },
  {
    
    timestamps: true,
  }
);


recipeSchema.index({ category: 1 });


recipeSchema.index({ title: 1 });

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
