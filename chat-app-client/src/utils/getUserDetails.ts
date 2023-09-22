function getUserDetails() {
  try {
    if (typeof window !== "undefined") {
      const user_details = JSON.parse(localStorage.getItem("user_details"));
      return user_details;
    }
    return null;
  } catch (error) {
    console.error("Error getting user details:", error);
    return null;
  }
}

export const user_details = getUserDetails();
