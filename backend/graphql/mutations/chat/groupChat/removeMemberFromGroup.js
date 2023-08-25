const { Group, Member } = require("../../../../models");

// Mutation to remove a member from a group
const removeMemberFromGroup = async (_, { groupId, userId }, { user }) => {
  try {
    const group = await Group.findByPk(groupId);

    // Check if the user making the request is the admin
    if (group.adminId !== user.id) {
      throw new AuthenticationError("Permission denied");
    }

    // Remove the member from the group
    await Member.destroy({ where: { groupId, userId } });

    return {
      success: true,
      message: "Member removed from group",
    };
  } catch (error) {
    console.error("Error removing member:", error);
    return {
      success: false,
      message: "Failed to remove member",
    };
  }
};

module.exports = removeMemberFromGroup;
