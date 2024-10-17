import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
const order = require("@/assets/images/order.png");

const UserHistoryOrderInfo = () => {
  return (
    <View className="bg-white p-4 rounded-lg border-b">
      <View className="flex-row justify-between">
        <View>
          <Image source={order} className="w-16 h-24" />
          <Text className="text-base text-primary">2 sản phẩm</Text>
        </View>
        <View className="mt-2 gap-2">
          <View className="flex-row justify-between mt-2">
            <Text className="text-xs text-primary">03/10/2024</Text>
            <Text className="text-xs text-primary">Đang xác nhận đơn hàng</Text>
          </View>

          <View className="flex-row justify-between items-center border-b border-primary mt-2">
            <Text className="text-lg text-[#392C7A] font-bold">
              RED JASPER ×1
            </Text>
            <Text className="text-lg text-[#392C7A] ">80.000 VND</Text>
          </View>
          <Text className="text-xl font-bold mt-2 text-primary">
            Thành tiền: 160.000 VND
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(user)/history-order-detail")}
            className="bg-primary py-2 px-4 rounded"
          >
            <Text className="text-white text-center">Xem chi tiết</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-red-500 py-2 px-4 rounded">
            <Text className="text-white text-center">Huỷ đơn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserHistoryOrderInfo;
