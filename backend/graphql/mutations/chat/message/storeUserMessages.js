const { Message } = require("../../../../models");

const storeUserMessages = {
  Mutation: {
    storeMessages: async (
      _,
      { senderId, recipientId, chatId, message, dateTime }
    ) => {
      try {
        const insertedMessage = await Message.create({
          senderId: senderId,
          recipientId: recipientId,
          chatId: chatId,
          message: message,
          dateTime: dateTime,
        });
        if (insertedMessage) {
          return {
            success: true,
            message: "Message inserted successfully",
            insertedMessage: {
              messageId: insertedMessage.messageId,
              senderId: insertedMessage.senderId,
              recipientId: insertedMessage.recipientId,
              chatId: insertedMessage.chatId,
              message: insertedMessage.message,
              dateTime: insertedMessage.dateTime,
            },
          };
        } else {
          return {
            success: false,
            message: "Failed to insert message",
            insertedMessage: null,
          };
        }
      } catch (err) {
        console.error("Error inserting message:", err);
        throw new Error("Failed to insert message");
      }
    },
  },
};

module.exports = storeUserMessages;
