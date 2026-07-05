export const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: messages.join(', '),
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Email already registered',
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};
