const router = require('express').Router();
const Message = require('../models/messageModel');

router.post('/addmsg', async (req, res,next)=> {
  try{
    const {from, to, message} = req.body;
    const data = await Message.create({
      message: {text: message},
      users: [from, to],
      sender: from
    })
    if (data) {
      return res.json("message saved")
    }
    return res.json('failed to save message')
    
  }catch(ex) {
    next(ex);
  }
});

router.post('/getmsg', async (req,res, next)=> {
  console.log(req.body)
  try{
    const {from, to} = req.body;
    const messages = await Message.find({
      users: {$all: [from, to]}
    }).sort({updateAt: 1})

    const projectedMessages = messages.map((msg)=> {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text
      }
    })
    res.json(projectedMessages)
  }catch(ex){
    next(ex)
  }
});

module.exports = router;