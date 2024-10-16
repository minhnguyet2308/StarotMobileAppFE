import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
const booking = require("@/assets/images/booking.png");

const BookingInfo = () => {
  return (
    <View className="flex-row gap-4">
      <View className="gap-2">
        <Image source={booking} className="w-[83px] h-[83px] object-cover" />
        <Image source={booking} className="w-[83px] h-[83px] object-cover" />
      </View>
      <View className="flex-1 py-4">
        <View className="flex-row justify-between pb-2 border-b border-b-primary">
          <Text className="text-primary font-semibold">Trạng thái</Text>
          <Text className="text-yellow-500 font-semibold">Hoàn thành</Text>
        </View>
        <Text className="text-lg line-clamp-1 text-primary font-semibold">
          Gói trải bài tổng quan tuần
        </Text>
        <View className="flex-row justify-between mt-2">
          <Text className="text-primary text-xl font-medium">Khách</Text>
          <Text className="text-primary text-xl font-medium">Phương Khanh</Text>
        </View>
        <View className="flex-row justify-between mt-2">
          <Text className="text-primary text-xl font-medium">Trạng thái</Text>
          <Text className="text-primary text-xl font-medium">Hoàn thành</Text>
        </View>
        <TouchableOpacity className="bg-primary rounded-lg mt-2">
          <Text className="text-white text-lg font-semibold text-center">
            Tham gia
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingInfo;
