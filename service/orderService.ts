import axiosInstance from "@/config/instan";
import { orderParams } from "@/utils/datatype";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getOrder = async (params?: orderParams) => {
  const token = await AsyncStorage.getItem("token");

  return axiosInstance.get("/v1/orders", {
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getOrder };
