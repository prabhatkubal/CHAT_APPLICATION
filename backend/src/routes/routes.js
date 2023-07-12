const express = require("express");
const router = express.Router();
const User = require("../../models").User;
const Message = require('../../models').Message;
const { Op } = require("sequelize");

//store messages api
router.post('/messages', async (req, res) => {
  try {
    const { senderId, recipientId, chatId, message, dateTime } = req.body;
    const insertedMessage = await Message.create({
      senderId: senderId,
      recipientId: recipientId,
      chatId: chatId,
      message: message,
      dateTime: dateTime
    });
    res.status(200).json({
      success: true,
      message: 'Message inserted successfully',
      insertedMessage
    });
  } catch (err) {
    console.error('Error inserting message:', err);
    res.status(500).json({ success: false, error: 'Failed to insert message' });
  }
});


// get messages api
router.get('/messages/:senderId/:recipientId', async (req, res) => {
  try {
    const senderId = req.params.senderId;
    const recipientId = req.params.recipientId;
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: senderId, recipientId: recipientId },
          { senderId: recipientId, recipientId: senderId }
        ]
      },
      order: [['dateTime', 'ASC']]
    });
    res.status(200).json({ success: true, messages });
  } catch (err) {
    console.error('Error retrieving messages:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve messages' });
  }
});


// //delete messages
// //code to change url
// router.delete("/messages/:chatId/:messageId", (req, res) => {
//   // Delete the message

//   // Change the URL to "/messages" without reloading the page
//   const newUrl = "/messages";
//   const stateObj = { page: "messages" };
//   history.pushState(stateObj, "", newUrl);

//   // Send response or perform any additional actions
// });

// //query params
// router.delete("/messages/:chatId/:messageId", (req, res) => {
//   const chatId = req.params.chatId;
//   const messageId = req.params.messageId;

//   const deleteQuery = `
//       DELETE FROM messages
//       WHERE chatId = $1 AND messageId = $2
//     `;

//   const values = [chatId, messageId];

//   pool.query(deleteQuery, values, (err, result) => {
//     if (err) {
//       console.error("Error deleting message:", err);
//       return res
//         .status(500)
//         .json({ success: false, error: "Failed to delete message" });
//     }

//     if (result.rowCount === 0) {
//       return res
//         .status(404)
//         .json({ success: false, error: "Message not found" });
//     }

//     return res
//       .status(200)
//       .json({ success: true, message: "Message deleted successfully" });
//   });
// });

// //delete message
// router.delete("/messages", (req, res) => {
//   const { chatId, messageId } = req.body;

//   if (!chatId || !messageId) {
//     return res.status(400).json({
//       success: false,
//       error: "Invalid request. Both chatId and messageId are required.",
//     });
//   }

//   const deleteQuery = `
//       DELETE FROM messages
//       WHERE chatId = $1 AND messageId = $2
//     `;

//   const values = [chatId, messageId];

//   pool.query(deleteQuery, values, (err, result) => {
//     if (err) {
//       console.error("Error deleting message:", err);
//       return res
//         .status(500)
//         .json({ success: false, error: "Failed to delete message" });
//     }

//     if (result.rowCount === 0) {
//       return res
//         .status(404)
//         .json({ success: false, error: "Message not found" });
//     }

//     return res
//       .status(200)
//       .json({ success: true, message: "Message deleted successfully" });
//   });
// });

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users, success: true });
  } catch (err) {
    console.error('Error retrieving users:', err);
    res.status(500).json({ error: 'Failed to retrieve users', success: false });
  }
});


module.exports = router;
