const router = require('express').Router();
const Message = require('../models/messageModel');

router.post('/addmsg', async (req, res,next)=> {
  try{
    const {from, to, message} = req.body;
    Message.create({
      message: {text: message},
      users: [from, to],
      sender: from
    }).then(data=> {
      res.json({msg: "message added"})
    })
    
  }catch(err) {
    next(err);
  }
});

router.post('/getmsg', async (req,res, next)=> {
  console.log(req.body)
  try{
    const {from, to} = req.body;
    const messages = await Message.find({
      users: {Sall: [from, to]}
    }).sort({updateAt: 1})

    const projectedMessages = messages.map((msg)=> {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text
      }
    })
    res.json(projectedMessages)
  }catch(err){
    next(err)
  }
});

module.exports = router;