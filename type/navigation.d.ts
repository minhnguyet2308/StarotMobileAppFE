import { ParamListBase } from "@react-navigation/native";

export type RootStackParamList = {
  ReaderService: undefined;
  ReaderDetailService: { readerId: string };
  ReaderServiceBooking: { readerId: string };
};

export type RootStackParamShopList = {
  Shop: undefined;
  ShopDetail: { name: string };
};

export type RootStackParamCartList = {
  Cart: undefined;
};

export type RootStackParamPayment = {
  Payment: {
    finalPrice: number;
    cartItems: any[];
    address: string;
    method: string;
  };
};

export type RootStackParamOrderConfirmationList = {
  OrderConfirmation: { cartItems: any[] };
};

export type RootStackParamPaymentResult = {
  PaymentResult: {
    finalPrice: number;
    cartItems: any[];
    address: string;
    method: string;
  };
};

export type RootStackParamServiceConfirmation = {
  ServiceConfirmation: { date: number; time: string };
};

export type RootStackParamServiceResult = {
  ServiceResult: { date: number; time: string; finalPrice: number };
};
