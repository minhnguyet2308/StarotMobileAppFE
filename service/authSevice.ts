import axiosInstance from "@/config/instan";
import { formUserType, userLoginType } from "@/utils/datatype";
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

const getUserTransaction = async () => {
  const token = await AsyncStorage.getItem("token");
  return axiosInstance.get("/v1/transaction", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const updateUserInfo = async (formData: formUserType) => {
  const token = await AsyncStorage.getItem("token");
  return axiosInstance.put(
    "/v1/user/info",
    {},
    {
      params: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export { userLogin, getUserInfo, updateUserInfo, getUserTransaction };
