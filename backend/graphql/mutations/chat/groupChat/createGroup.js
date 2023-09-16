const { Group, User, Member } = require("../../../../models");
const { v4: uuidv4 } = require("uuid");
const NotFoundError = require("../../../errors/NotFound/NotFoundError");

const createGroup = {
  Mutation: {
    createGroup: async (_, { groupName, adminId }, { req, res }) => {
      console.log("something atleast comes here ", groupName, adminId);
      try {
        const uuid = uuidv4();

        // Fetch the admin user through the association
        const adminUser = await User.findByPk(adminId, {
          include: [
            {
              model: Group,
              as: "admin", // Assuming you set up an alias for the association
            },
          ],
        });

        if (!adminUser) {
          throw new NotFoundError("User", `ID ${adminId}`);
        }

        const group = await Group.create({
          groupId: uuid,
          groupName: groupName,
          adminId: adminId,
        });

        console.log("Created group:", group);

        if (group) {
          await Member.create({
            groupId: uuid,
            userId: adminId,
            adminId: adminId,
            adminName: adminUser.name,
            isAdmin: true,
          });
          return {
            message: "Group created successfully",
            success: true,
          };
        } else {
          return {
            message: "Failed to create group",
            success: false,
          };
        }
      } catch (err) {
        console.error("Error creating group:", err);
        // throw new Error("Failed to create group");
        return {
          message: "Failed to create group" + `${err}`,
          success: false,
        };
      }
    },
  },
};

module.exports = createGroup;
