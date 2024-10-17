import axiosInstance from "@/config/instan";
import { userLoginType } from "@/utils/datatype";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userLogin = (formData: userLoginType) => {
  return axiosInstance.post("/auth/login", formData);
};
const getUserInfo = async () => {
  const token = await AsyncStorage.getItem("token");
  return axiosInstance.get("/v1/user/info", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { userLogin, getUserInfo };
