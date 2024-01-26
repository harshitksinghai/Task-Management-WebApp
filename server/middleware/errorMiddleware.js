const notFound = (req, res, next) => { // this does not have parameter 'err' so express identifies it as a normal middleware
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // check server.js for detailed explanation of this line of code
  };
  
  const errorHandler = (err, req, res, next) => { // this have parameter 'err' so express identifies it as an error handling middleware
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
  
    // If Mongoose not found error, set to 404 and change message
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      statusCode = 404;
      message = 'Resource not found';
    }
  
    res.status(statusCode).json({
      message: message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  
  export { notFound, errorHandler };
  