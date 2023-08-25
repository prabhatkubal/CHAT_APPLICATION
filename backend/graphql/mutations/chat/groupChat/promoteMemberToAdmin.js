const { Group, Member } = require("../../../../models");

// Mutation to promote a member to admin
const promoteMemberToAdmin = async (_, { groupId, userId }, { user }) => {
  try {
    const group = await Group.findByPk(groupId);

    // Check if the user making the request is the admin
    if (group.adminId !== user.id) {
      throw new AuthenticationError("Permission denied");
    }

    // Update the member's isAdmin status
    await Member.update({ isAdmin: true }, { where: { groupId, userId } });

    return {
      success: true,
      message: "Member promoted to admin",
    };
  } catch (error) {
    console.error("Error promoting member:", error);
    return {
      success: false,
      message: "Failed to promote member",
    };
  }
};

module.exports = promoteMemberToAdmin;
