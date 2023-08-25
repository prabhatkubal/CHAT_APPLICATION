// Import necessary models and modules
const { Group, Member } = require("../../../../models");

// Mutation to create a group
const createGroup = async (_, { groupName, userId }) => {
  try {
    // Create the group with the provided group name and the user's ID as adminId
    const group = await Group.create({
      groupName: groupName,
      adminId: userId, // user.id is the authenticated user's ID
    });

    console.log("Created group:", group);

    if (group) {
      return {
        success: true,
        message: "Group created successfully",
        group: group,
      };
    } else {
      return {
        success: false,
        message: "Failed to create group",
        group: null,
      };
    }
  } catch (err) {
    console.error("Error creating group:", err);
    throw new Error("Failed to create group");
  }
};

module.exports = createGroup;
