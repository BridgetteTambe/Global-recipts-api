require("dotenv").config(); // Load .env variables before anything else

const express = require("express");
const connectDB = require("./config/database");
const recipeRoutes = require("./routes/recipe.routes");
const globalErrorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use("/recipes", recipeRoutes);


app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});


app.use(globalErrorHandler);


const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`The Global Kitchen API is running on port ${PORT}`);
  });
};

startServer();
