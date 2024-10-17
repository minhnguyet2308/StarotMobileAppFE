import HeaderUser from "@/components/HeaderUser";
import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const order = require("@/assets/images/order.png");

const HistoryOrderDetail = () => {
  return (
    <SafeAreaView className="flex-1 bg-white px-4 pb-20">
      <ScrollView>
        <HeaderUser title="CHI TIẾT ĐƠN HÀNG" />
        <Text className="text-primary text-base font-bold text-center">
          Đang xác nhận đơn hàng
        </Text>

        <View className="mt-4">
          <View className="flex-row justify-between mt-2 border-b-primary border-b pb-2">
            <Text className="text-primary font-semibold">#15270</Text>
            <Text className="text-primary font-semibold">03/10/2024</Text>
          </View>
        </View>
        <View className="mt-4 border-b border-b-primary pb-2">
          <Text className="font-bold text-lg mb-2 text-primary">
            THÔNG TIN VẬN CHUYỂN
          </Text>
          <Text className="text-primary font-bold">Người nhận</Text>
          <Text className="text-primary">Trần Hiếu Nghĩa</Text>
          <Text className="text-primary mt-2 font-bold">Số điện thoại</Text>
          <Text className="text-primary">0374356218</Text>
          <Text className="text-primary mt-2 font-bold">Địa chỉ</Text>
          <Text className="text-primary">
            Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí
            Minh 700000, Việt Nam.
          </Text>
        </View>
        <View className="mt-4 px-4">
          <Text className="font-bold text-lg mb-2 text-primary">
            THÔNG TIN ĐƠN HÀNG
          </Text>
          <View className="flex-row justify-between items-center mt-2 pb-2 border-b border-b-primary">
            <Image source={order} className="w-16 h-24" />
            <View className="flex-1 ml-4">
              <View className="flex-row justify-between items-center border-b border-b-primary">
                <Text className="text-primary">RED JASPER</Text>
                <Text className="text-primary">80.000 VND</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-primary mt-2">Số lượng: 1</Text>
                <Text className="text-primary mt-2">80.000 VND</Text>
              </View>
            </View>
          </View>
          <View className="flex-row justify-between items-center mt-2 pb-2 border-b border-b-primary">
            <Image source={order} className="w-16 h-24" />
            <View className="flex-1 ml-4">
              <View className="flex-row justify-between items-center border-b border-b-primary">
                <Text className="text-primary">RED JASPER</Text>
                <Text className="text-primary">80.000 VND</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-primary mt-2">Số lượng: 1</Text>
                <Text className="text-primary mt-2">80.000 VND</Text>
              </View>
            </View>
          </View>
          <View className="mt-4 px-4">
            <Text className="font-bold text-lg mb-2">
              PHƯƠNG THỨC THANH TOÁN
            </Text>

            {/* Payment Method */}
            <View className="border rounded-lg p-3 flex-row justify-between items-center">
              <Text className="text-black">Tiền mặt</Text>
              <View className="border border-blue-500 w-4 h-4 rounded-full items-center justify-center">
                <View className="w-2 h-2 bg-blue-500 rounded-full" />
              </View>
            </View>

            {/* Price Breakdown */}
            <View className="mt-4">
              <View className="flex-row justify-between mt-2">
                <Text className="text-gray-600">Tạm tính</Text>
                <Text className="text-black">160.000 VND</Text>
              </View>
              <View className="flex-row justify-between mt-2">
                <Text className="text-gray-600">Phí vận chuyển</Text>
                <Text className="text-black">30.000 VND</Text>
              </View>
              <View className="flex-row justify-between mt-2">
                <Text className="text-gray-600">Ưu đãi</Text>
                <Text className="text-black">-0 VND</Text>
              </View>
              <View className="flex-row justify-between mt-2">
                <Text className="text-black font-bold">THÀNH TIỀN</Text>
                <Text className="text-black font-bold">190.000 VND</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryOrderDetail;
