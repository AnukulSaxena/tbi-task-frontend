import axios from "axios";

// AuthService class responsible for handling authentication-related API calls
class AuthService {
  constructor() {
    // Create an Axios instance with base URL obtained from environment variable
    this.axiosInstance = axios.create({
      baseURL: String(import.meta.env.VITE_APP_VERCEL_URL),
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }

  // Method to set authentication token from local storage
  setAuthTokenFromLocalStorage() {
    const token = localStorage.getItem("tbi-token");
    if (token) {
      this.setAuthToken(token);
    }
  }

  // Method to set authentication token in Axios instance headers
  setAuthToken(token) {
    if (token) {
      this.axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete this.axiosInstance.defaults.headers["Authorization"];
    }
  }

  // Method to create a new user account
  async createAccount(data) {
    try {
      const response = await this.axiosInstance.post("/users/register", data);
      return response?.data;
    } catch (error) {
      console.log("AuthService :: createAccount :: error", error);
      throw error?.response?.data;
    }
  }

  // Method to log in user and obtain authentication token
  async loginAccount(data) {
    try {
      const response = await this.axiosInstance.post("/users/login", data);
      const tokenObject = {
        accessToken: response?.data?.data?.accessToken,
      };

      localStorage.setItem("tbi-token", JSON.stringify(tokenObject));
      this.setAuthTokenFromLocalStorage();
      return response?.data;
    } catch (error) {
      console.log("AuthService :: loginAccount :: error", error);
      throw error?.response?.data;
    }
  }

  // Method to fetch current user data
  async getCurrentUser() {
    try {
      const response = await this.axiosInstance.get("/users/current-user");
      return response?.data?.data;
    } catch (error) {
      console.log("AuthService :: getCurrentUser :: error", error);
      return null;
    }
  }

  // Method to log out user
  async logoutAccount() {
    try {
      localStorage.removeItem("tbi-token");
      this.setAuthToken(null);
      return await this.axiosInstance.post("/users/logout");
    } catch (error) {
      console.log("AuthService :: logoutAccount :: error", error);
      throw error;
    }
  }

  // Method to change user password
  async changePassword(data) {
    try {
      const response = await this.axiosInstance.post(
        "/users/change-password",
        data
      );
      console.log(response);
    } catch (error) {
      console.log("AuthService :: changePassword :: error", error);
      throw error?.response?.data;
    }
  }
}

// Create instance of AuthService class
const authService = new AuthService();

// Export instance of AuthService class
export default authService;
