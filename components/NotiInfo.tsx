import { View, Text, Image } from "react-native";
import React from "react";
const booking = require("@/assets/images/booking.png");

const NotiInfo = () => {
  return (
    <View className="flex-row items-center bg-white mt-2 rounded-lg">
      <Image source={booking} className="w-16 h-16 rounded-full" />
      <View className="flex-1 ml-2">
        <Text className="font-semibold text-lg text-primary">
          Phương Khanh{" "}
          <Text className="font-normal text-primary">
            đã huỷ hẹn lịch xem Tarot.
          </Text>
        </Text>
        <Text className="text-sm text-primary mt-1">30 phút</Text>
      </View>
    </View>
  );
};

export default NotiInfo;
