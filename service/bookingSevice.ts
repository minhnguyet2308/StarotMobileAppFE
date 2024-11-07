import axiosInstance from "@/config/instan";
import { bookingParams } from "@/utils/datatype";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getBooking = (params?: bookingParams) => {
  return axiosInstance.get("/v1/booking", { params: params });
};

const updateBooking = async (bookingId: string) => {
  const token = await AsyncStorage.getItem("token");

  return axiosInstance.put(
    `/v1/booking/${bookingId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export { getBooking, updateBooking };
