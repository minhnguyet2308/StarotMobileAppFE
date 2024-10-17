import axiosInstance from "@/config/instan";
import { userLoginType } from "@/utils/datatype";

const userLogin = (formData: userLoginType) => {
  return axiosInstance.post("/auth/login", formData);
};
export { userLogin };
