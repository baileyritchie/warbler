require('dotenv').config({path:'../.env'});
const jwt = require('jsonwebtoken');

//make sure user is logged in - authentication
exports.loginRequired = function(req,res,next){
  try{
    const token = req.headers.authorization.split(" ")[1] 
    jwt.verify(token,process.env.SECRET_KEY, function(err,decoded){
      if(decoded){
        //if payload exists or it is decoded, you are logged in
        return next(); 
      }else{
        // token could not be decoded
        return next({
          status:401,
          message:"Please log in first."
        });
      }
    })
  }
  catch(err){
    return next({
      status:401,
      message:"Please log in first."
    });
  }
}

//make sure we get the correct user - authorization to create messages
exports.ensureCorrectUser = function(req,res,next){
  try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token,process.env.SECRET_KEY, function(err,decoded) {
      if(decoded && decoded.id ===req.params.id){
        // token exists and token id matches current user
        next();
      }
      else{
        return next({
          status:401,
          message:"Unauthorized"
        });
      }
    });
  } catch(err){
    return next({
      status:401,
      message:"Unauthorized"
    });
  }
}
