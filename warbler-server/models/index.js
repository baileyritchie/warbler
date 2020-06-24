const mongoose = require('mongoose');
mongoose.set("debug",true);
mongoose.Promise = Promise;

mongoose.connect(process.env.DATABASE, {
  keepAlive:true,
  useNewUrlParser:true
});

module.exports.User = require('./user');
module.exports.Message = require('./message');
