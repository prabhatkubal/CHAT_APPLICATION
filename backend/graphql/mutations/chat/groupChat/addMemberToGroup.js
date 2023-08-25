const { Group, Member } = require("../../../../models");

// Mutation to add a member to a group
const addMemberToGroup = async (_, { groupId, userId }, { user }) => {
  try {
    const group = await Group.findByPk(groupId);

    // Check if the user making the request is the admin
    if (group.adminId !== user.id) {
      throw new AuthenticationError("Permission denied");
    }

    // Associate the user with the group
    await Member.create({ groupId, userId });

    return {
      success: true,
      message: "Member added successfully",
    };
  } catch (error) {
    console.error("Error adding member:", error);
    return {
      success: false,
      message: "Failed to add member",
    };
  }
};

module.exports = addMemberToGroup;
