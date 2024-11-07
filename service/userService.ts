import axiosInstance from "@/config/instan";
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

export { payOs, getAllNotify };
