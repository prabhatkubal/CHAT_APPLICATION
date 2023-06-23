import apiInstance from "../api/apiInstance";

// Signup api
const signup = async (userData: any) => {
  try {
    const response = await apiInstance.post("/account/signup", userData);
    return response;
  } catch (error) {
    console.error("Signup api error:", error);
    throw error;
  }
};

// Login api
const login = async (credentials: any) => {
  try {
    const response = await apiInstance.post("/account/login", credentials);
    return response;
  } catch (error) {
    console.error("Login api error:", error);
    throw error;
  }
};

// Get Users api
const getUsers = async () => {
  try {
    const response = await apiInstance.get("/users");
    return response;
  } catch (error) {
    console.error("Get Users api error:", error);
    throw error;
  }
};

export { signup, login, getUsers };
