const router = require('express').Router();
const Message = require('../models/messageModel');
const {addMessages, getMessages} = require("../controllers/messageController");

router.post('/addmsg', addMessages);
router.post('/getmsg', getMessages);

module.exports = router;