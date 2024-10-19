import { useAuth } from "@/context/authContext";
import { scheduleType } from "@/utils/datatype";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
const booking = require("@/assets/images/booking.png");

const BookingInfo = ({ schedule }: { schedule: scheduleType }) => {
  const { user } = useAuth();

  return (
    <View className="flex-row gap-4 p-2">
      <View className="gap-2">
        <Image source={booking} className="w-[83px] h-[83px] object-cover" />
        <Image
          source={{ uri: schedule.packageImage }}
          className="w-[83px] h-[83px] object-cover"
        />
      </View>
      <View className="flex-1 py-4">
        <View className="flex-row justify-between pb-2 border-b border-b-primary">
          <Text className="text-primary font-semibold">Thời gian</Text>
          <Text className="text-yellow-500 font-semibold">
            {schedule.status}
          </Text>
        </View>
        <Text className="text-lg line-clamp-1 text-primary font-semibold">
          {schedule.packageName}
        </Text>
        <View className="flex-row justify-between mt-2">
          <Text className="text-primary text-xl font-medium">
            {user?.role === "Customer" ? "Reader" : "Khách"}
          </Text>
          <Text className="text-primary text-xl font-medium">
            {schedule.readerName}
          </Text>
        </View>
        <View className="flex-row justify-between mt-2">
          <Text className="text-primary text-xl font-medium">Thời gian</Text>
          <Text className="text-primary text-xl font-medium">
            {schedule.startHour}
          </Text>
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
