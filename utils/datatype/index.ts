export interface navigatorType {
  [x: string]: any;
}
export interface userLoginType {
  email: string;
  password: string;
}
export interface userLoginResponse {
  token: string;
  refreshToken: string;
}
export interface ResponseTypeOJ<T> {
  status: number;
  message: string;
  data: T;
}
export interface ResponseTypeOJPagi<T> {
  totalCount: number;
  pageCount: number;
  pageSize: number;
  pageNumber: number;
  data: T;
}
export interface userType {
  role: string;
  email: string;
  sub: string;
}
export type TransitonType = "Tình Yêu" | "Công Việc" | "Sức Khỏe";

export interface cardParams {
  Id?: number;
  Name?: string;
  Type?: TransitonType;
  PageNumber?: number;
  PageSize?: number;
}

export interface cardType {
  id: number;
  name: string;
  content: string;
  image: string;
  type: TransitonType;
}
