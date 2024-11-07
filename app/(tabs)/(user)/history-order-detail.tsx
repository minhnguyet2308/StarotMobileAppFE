import HeaderUser from "@/components/HeaderUser";
import { orderType } from "@/utils/datatype";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const order = require("@/assets/images/order.png");

const HistoryOrderDetail = () => {
  const [orderDetail, setOrderDetail] = useState<orderType | null>(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      const storedOrder = await AsyncStorage.getItem("orderDetailLocal");
      if (storedOrder) {
        setOrderDetail(JSON.parse(storedOrder) as orderType);
      }
    };
    fetchOrderDetail();
  }, []);

  if (!orderDetail) {
    return (
      <SafeAreaView className="flex-1 bg-white px-4 pb-20">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pb-20">
      <ScrollView>
        <HeaderUser title="CHI TIẾT ĐƠN HÀNG" />
        <Text className="text-primary text-base font-bold text-center">
          Đang xác nhận đơn hàng
        </Text>

        <View className="mt-4">
          <View className="flex-row justify-between mt-2 border-b-primary border-b pb-2">
            <Text className="text-primary font-semibold">{orderDetail.id}</Text>
            <Text className="text-primary font-semibold">
              {orderDetail.orderDate}
            </Text>
          </View>
        </View>

        <View className="mt-4 border-b border-b-primary pb-2">
          <Text className="font-bold text-lg mb-2 text-primary">
            THÔNG TIN VẬN CHUYỂN
          </Text>
          <Text className="text-primary font-bold">Người nhận</Text>
          <Text className="text-primary">{orderDetail.userName}</Text>
          <Text className="text-primary mt-2 font-bold">Số điện thoại</Text>
          <Text className="text-primary">{orderDetail.phone}</Text>
          <Text className="text-primary mt-2 font-bold">Địa chỉ</Text>
          <Text className="text-primary">{orderDetail.address}</Text>
        </View>

        <View className="mt-4 px-4">
          <Text className="font-bold text-lg mb-2 text-primary">
            THÔNG TIN ĐƠN HÀNG
          </Text>
          {orderDetail.products.map((product, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center mt-2 pb-2 border-b border-b-primary"
            >
              <Image
                source={
                  orderDetail.products?.length ? { uri: product.image } : order
                }
                className="w-16 h-24"
              />
              <View className="flex-1 ml-4">
                <View className="flex-row justify-between items-center border-b border-b-primary">
                  <Text className="text-primary">{product.name}</Text>
                  <Text className="text-primary">{product.unitPrice} VND</Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-primary mt-2">
                    Số lượng: {product.amount}
                  </Text>
                  <Text className="text-primary mt-2">
                    {product.unitPrice * product.amount} VND
                  </Text>
                </View>
              </View>
            </View>
          ))}
          <View className="mt-4 px-4">
            <Text className="font-bold text-lg mb-2">
              PHƯƠNG THỨC THANH TOÁN
            </Text>

            <View className="border rounded-lg p-3 flex-row justify-between items-center">
              <Text className="text-black">{orderDetail.paymentMethod}</Text>
              <View className="border border-blue-500 w-4 h-4 rounded-full items-center justify-center">
                <View className="w-2 h-2 bg-blue-500 rounded-full" />
              </View>
            </View>

            <View className="mt-4">
              <View className="flex-row justify-between mt-2">
                <Text className="text-gray-600">Tạm tính</Text>
                <Text className="text-black">{orderDetail.total} VND</Text>
              </View>
              <View className="flex-row justify-between mt-2">
                <Text className="text-gray-600">Phí vận chuyển</Text>
                <Text className="text-black">{0} VND</Text>
              </View>
              <View className="flex-row justify-between mt-2">
                <Text className="text-gray-600">Ưu đãi</Text>
                <Text className="text-black">{0} VND</Text>
              </View>
              <View className="flex-row justify-between mt-2">
                <Text className="text-black font-bold">THÀNH TIỀN</Text>
                <Text className="text-black font-bold">
                  {orderDetail.total} VND
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryOrderDetail;
