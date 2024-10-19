import { ParamListBase } from "@react-navigation/native";

export type RootStackParamList = {
  ReaderService: undefined;
  ReaderDetailService: { readerId: string };
};

export type RootStackParamShopList = {
  Shop: undefined;
  ShopDetail: { name: string };
};
