import axiosInstance from "@/config/instan";
import { bookingParams } from "@/utils/datatype";

const getBooking = (params?: bookingParams) => {
  return axiosInstance.get("/v1/booking", { params: params });
};

export { getBooking };
