import axiosInstance from "@/config/instan";
import { orderParams } from "@/utils/datatype";

const getOrder = (params?: orderParams) => {
  return axiosInstance.get("/v1/orders", { params: params });
};

export { getOrder };
