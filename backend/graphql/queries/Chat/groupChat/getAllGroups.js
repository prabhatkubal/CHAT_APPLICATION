const { Group, Member, User } = require("../../../../models");
const { Op } = require("sequelize");

const getAllGroups = {
  Query: {
    getAllGroups: async (_, {}, { user }) => {
      try {
        // Check if the user is authenticated
        if (!user) {
          return {
            message: "User not authenticated",
            success: false,
          };
        }

        // Find all groups where the user is a member
        const userGroups = await Group.findAll({
          include: [
            {
              model: Member,
              where: {
                userId: user.id,
              },
            },
          ],
        });

        // If the user is not a member of any group, return a message
        if (!userGroups || userGroups.length === 0) {
          return {
            message: "No groups found",
            success: true, // You can choose an appropriate success status
            groups: [],
          };
        }

        // Return the groups where the user is a member
        const groups = userGroups.map((group) => {
          return {
            groupId: group.groupId,
            groupName: group.groupName,
            adminId: group.adminId,
          };
        });

        return {
          success: true,
          groups: groups,
        };
      } catch (error) {
        console.error("Error fetching groups:", error);
        return {
          message: "Failed to fetch groups",
          success: false,
        };
      }
    },
  },
};

module.exports = getAllGroups;
