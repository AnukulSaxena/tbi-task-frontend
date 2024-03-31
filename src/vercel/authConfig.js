import axios from "axios";

class AuthService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:3000/api/v1",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Set credentials here
    });
  }

  setAuthTokenFromLocalStorage() {
    const token = localStorage.getItem("tbi-token");
    if (token) {
      this.setAuthToken(token);
    }
  }

  setAuthToken(token) {
    if (token) {
      this.axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete this.axiosInstance.defaults.headers["Authorization"];
    }
  }

  async createAccount(data) {
    try {
      const response = await this.axiosInstance.post("/users/register", data);
      return response?.data;
    } catch (error) {
      console.log("Express service :: createAccount :: error", error);
      throw error?.response?.data;
    }
  }

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
      console.log("Appwrite service :: login :: error", error);
      throw error?.response?.data;
    }
  }

  async getCurrentUser() {
    try {
      return await this.axiosInstance.get("/users/current-user");
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
      return null;
    }
  }

  async logoutAccount() {
    try {
      localStorage.removeItem("tbi-token");
      this.setAuthToken(null);
      return await this.axiosInstance.post("/users/logout");
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
