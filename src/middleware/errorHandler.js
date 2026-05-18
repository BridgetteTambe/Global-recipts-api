
const globalErrorHandler = (error, req, res, next) => {
  
  if (error.name === "CastError") {
    return res.status(400).json({
      status: "fail",
      message: `Invalid ID format: "${error.value}"`,
    });
  }

  
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((err) => err.message);
    return res.status(400).json({
      status: "fail",
      message: messages.join(". "),
    });
  }

 
  if (error.statusCode === 404) {
    return res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }

  
  console.error("Unexpected error:", error);
  res.status(500).json({
    status: "error",
    message: "Something went wrong on the server. Please try again later.",
  });
};

module.exports = globalErrorHandler;
