import axiosInstance from "@/config/instan";
import { cardParams } from "@/utils/datatype";

const getAllCard = (params?: cardParams) => {
  return axiosInstance.get("/v1/tarotcards", {
    params: params,
  });
};

export { getAllCard };
