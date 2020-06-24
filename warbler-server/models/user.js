const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email:{
    type:String,
    required: true,
    unique:true
  },
  username:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  profileImageUrl:{
    type:String
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  }]
});

userSchema.pre("remove", async function(next){
  // find a user
  // remove their id from a list of messages
  // save that user
  // return next
  try{
    let user = await User.findById(this.user);
    user.messages.remove(this.id);
    await user.save();
    return next();
  } catch(err){
    return next(err); 
  }
});
userSchema.pre("save", async function(next){
  // before each doc is saved in mogoose this is run to hash pw
  try{
    if(!this.isModified("password")){
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  }
  catch(err){
    return next(err);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword, next){
  try {
      let isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
  } catch (error) {
      next(error);
  }
}

const User = mongoose.model("User",userSchema);

module.exports = User;