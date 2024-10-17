import {
  View,
  Text,
  ImageBackgroundBase,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
const booking = require("@/assets/images/booking.png");

const UserHistoryInfo = () => {
  return (
    <View className="bg-white p-4 mb-2">
      <View className="flex-row justify-between pb-2 border-b border-b-primary">
        <Text className="text-primary font-semibold">Thứ 7 - 05/10/2024</Text>
        <Text className="text-yellow-500 font-semibold">Hoàn thành</Text>
      </View>
      <View className="gap-4 py-4">
        <View className="flex-row">
          <View className="mr-10 w-20">
            <Image source={booking} />
            <Image source={booking} className="absolute -bottom-6 -right-8" />
          </View>
          <View>
            <Text className="text-lg line-clamp-1 text-primary font-semibold">
              Gói trải bài tổng quan tuần
            </Text>
            <View className="flex-row justify-between mt-2">
              <Text className="text-[#392c7a] text-lg">Reader</Text>
              <Text className="text-primary text-lg font-medium">Julee</Text>
            </View>
            <View className="flex-row justify-between mt-2">
              <Text className="text-[#392c7a] text-lg">Thời gian</Text>
              <Text className="text-primary text-lg font-medium">
                19:00 - 20:00
              </Text>
            </View>
            <View className="flex-row justify-between mt-2">
              <Text className="text-[#392c7a] text-lg">Thành tiền</Text>
              <Text className="text-primary text-lg font-medium">
                150.000 VND
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserHistoryInfo;
