const Message = require("../../models").Message;

const storeUserMessages = {
  Mutation: {
    storeMessages: async (_, { senderId, recipientId, chatId, message, dateTime }) => {
      try {
        const insertedMessage = await Message.create({
          senderId: senderId,
          recipientId: recipientId,
          chatId: chatId,
          message: message,
          dateTime: dateTime,
        });
        return {
          success: true,
          message: "Message inserted successfully",
          insertedMessage,
        };
      } catch (err) {
        console.error("Error inserting message:", err);
        throw new Error("Failed to insert message");
      }
    },
  },
};

module.exports = storeUserMessages;
