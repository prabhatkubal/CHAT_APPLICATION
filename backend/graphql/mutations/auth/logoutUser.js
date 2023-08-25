const logoutUser = {
    Mutation: {
      logout: async (_, __, { res }) => {
        try {
          // Clear the jwt cookie
          res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            // sameSite: 'none',
            // path: '/',
          });
  
          return {
            message: "You have been logged out successfully",
            success: true,
          };
        } catch (err) {
          console.error("Error during logout:", err);
          throw new Error("Failed to log out");
        }
      },
    },
  };
  
  module.exports = logoutUser;
  