function errorHandler(error,request,response,next) {
  //route found but error on the server
  return response.status(error.status || 500).json({
    error: {
      message: error.message || "Oops, something went wrong"
    }
  });
}

module.exports = errorHandler;