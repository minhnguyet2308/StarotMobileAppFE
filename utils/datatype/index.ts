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
  name: string;
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
export interface formUserType {
  FirstName?: string;
  LastName?: string;
  Image?: string;
  Phone?: String;
  Gender?: string;
  DateOfBirth?: string;
}
export interface userProfileType {
  balance: number;
  dateOfBirth: string | null;
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  id?: string;
  image?: string;
  phone: string;
}
export interface bookingParams {
  CustomerId?: string;
  ReaderId?: string;
  Status?: string;
  ViewMyBooking?: string;
  Date?: string;
  PageNumber?: string;
  PageSize?: string;
}
export interface scheduleType {
  customerName: string;
  date: string;
  id: string;
  linkUrl: string;
  packageImage: string;
  packageName: string;
  readerName: string;
  startHour: string;
  status: string;
}
