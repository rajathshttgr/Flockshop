//centralized error handler
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace for debugging
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
  });
};

export default errorHandler;
