const Message = require("../../models").Message;

const deleteMessage = async (_, { messageId, chatId }) => {
  try {
    const message = await Message.findOne({
      where: {
        messageId: messageId,
        chatId: chatId,
      },
    });

    if (!message) {
      return {
        success: false,
        message: "Message not found",
      };
    }

    await message.destroy();
    return {
      success: true,
      message: "Message deleted successfully",
    };
  } catch (err) {
    console.error("Error deleting message:", err);
    throw new Error("Failed to delete message");
  }
};

module.exports = {
  Mutation: {
    deleteMessage,
  },
};
