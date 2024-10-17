import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://exestarotapi20241007212754.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.response.use((response) => {
  return response.data;
});

export default axiosInstance;
