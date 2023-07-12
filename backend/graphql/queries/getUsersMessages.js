const { Op } = require("sequelize");
const Message = require("../../models").Message;

const getUsersMessages = {
  Query: {
    getMessages: async (_, { senderId, recipientId }) => {
      try {
        const messages = await Message.findAll({
          where: {
            [Op.or]: [
              { senderId: senderId, recipientId: recipientId },
              { senderId: recipientId, recipientId: senderId },
            ],
          },
          order: [["dateTime", "ASC"]],
        });
        return messages;
      } catch (err) {
        console.error("Error retrieving messages:", err);
        throw new Error("Failed to retrieve messages");
      }
    },
  },
};

module.exports = getUsersMessages;
