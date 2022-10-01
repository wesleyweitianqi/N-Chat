const User = require('../models/useModel')
const bcrypt = require('bcryptjs');

module.exports.register = async (req, res, next) => {
  try{
    const { username, email, password }= req.body;
    const usernameValidate = await User.findOne({username});
    if (usernameValidate) return res.json({msg: "Username already used", status: false})
    const emailValidate = await User.findOne({ email }) 
    if (emailValidate) return res.json({msg: "Email already used", status: false})
    const hashpassword  = bcrypt.hashSync(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashpassword
    })
    delete user.password;
    return res.json({status: true, user})
  } catch (err) {
    next(err)
  }
  }

  module.exports.login = async(req,res,next) => {
    try{
      const {username, password} = req.body;
      const user1 = await User.findOne({ username })
      if (user1) {
        if(bcrypt.compareSync(password, user1.password)) {
          return res.json({status: true, user1})
        } else {
          return res.json({msg: "Password is wrong", status: false})
        }
      } else {
        return res.json({msg: "User not exist", status: false})
      }
    }catch(err) {
      console.error(err)
    }
  }

  module.exports.setAvatar = async(req,res,next) => {
    try{
      const userId = req.params.id;
      const { avatarImage } = req.body;
      const userData = await User.findByIdAndUpdate(userId, {isAvatarImageSet: true, avatarImage: avatarImage},{new: true})
      return res.json({isSet:userData.isAvatarImageSet, image: userData.avatarImage})
    }catch(err) {
      console.error(err)
    }
  }

  module.exports.getAllUsers = async (req,res,next) => {
    console.log("getallUsers")
    try{
      const users = await User.find({_id: {$ne: req.params.id}}).select([
        "email",
        "username",
        'avatarImage',
        '_id'
      ])
      return res.json(users)
    }catch(err) {
      console.error(err)
    }
  }

  module.exports.logOut = (req, res, next) => {
    try {
      if (!req.params.id){
        return res.json({ msg: "User id is required " });
      } 
      // onlineUsers.delete(req.params.id);
      return res.status(200).send();
    } catch (ex) {
      next(ex);
    }
  };