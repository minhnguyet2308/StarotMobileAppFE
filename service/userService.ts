import axiosInstance from "@/config/instan";
import { formUpdateUserType } from "@/utils/datatype";
import AsyncStorage from "@react-native-async-storage/async-storage";

const payOs = async (formData: { amount: number }) => {
  const token = await AsyncStorage.getItem("token");
  return axiosInstance.post("/v1/payOs", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const getAllNotify = async () => {
  const token = await AsyncStorage.getItem("token");

  return axiosInstance.get("/notification", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const updateUserInfo = async (formData: formUpdateUserType) => {
  const token = await AsyncStorage.getItem("token");
  return axiosInstance.put("/v1/customer", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
const updateReaderInfo = async (formData: formUpdateUserType) => {
  const token = await AsyncStorage.getItem("token");
  return axiosInstance.put("/v1/reader", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
export { payOs, getAllNotify, updateUserInfo, updateReaderInfo };
