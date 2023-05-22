const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "something went wrong.";
  res.status(statusCode).json({ error: message });
};

export default errorHandler;
