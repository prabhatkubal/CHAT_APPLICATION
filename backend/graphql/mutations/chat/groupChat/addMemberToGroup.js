const { Group, Member, User, GroupMessage } = require("../../../../models");
const {
  AuthenticationError,
} = require("../../../errors/Authentication/authenticationError");
const ResourceAlreadyExistsError = require("../../../errors/AlreadyExistsError/resourceAlreadyExistsError");
const NotFoundError = require("../../../errors/NotFound/NotFoundError");

// Mutation to add a member to a group
const addMemberToGroup = {
  Mutation: {
    addMemberToGroup: async (_, { groupId, userId }, { user }) => {
      try {
        const group = await Group.findByPk(groupId);

        //check if there is such group
        if (!group) {
          throw new NotFoundError("Group", `ID ${groupId}`);
        }

        //Check if user found or not
        const user = await User.findByPk(userId, {
          include: [
            {
              model: Member,
              required: true, // Ensures the user is associated with a member
            },
            {
              model: GroupMessage,
              required: false, // Fetch associated messages if needed
            },
          ],
        });
        if (!user) {
          throw new NotFoundError("User", `ID ${userId}`);
        }

        // Check if the user making the request is the admin
        if (group.adminId !== userId) {
          throw new AuthenticationError(
            "Group cannot be created by a non existing user"
          );
        }

        // Check if the selected user is already a member of the group
        const existingMember = await Member.findOne({
          where: { groupId, userId },
        });
        if (existingMember) {
          throw new ResourceAlreadyExistsError(`Member`, `userID: ${userId}`); // Throw the custom error
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
    },
  },
};

module.exports = addMemberToGroup;
