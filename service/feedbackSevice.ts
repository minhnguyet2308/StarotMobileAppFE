import axiosInstance from "@/config/instan";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getFeedback = async (ReaderId: string) => {
  const token = await AsyncStorage.getItem("token");

  return axiosInstance.get("/v1/feedback", {
    params: { ReaderId: ReaderId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getFeedback };
