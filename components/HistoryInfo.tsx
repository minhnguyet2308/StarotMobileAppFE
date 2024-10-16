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

const HistoryInfo = () => {
  return (
    <View className="bg-primary p-4 mb-2">
      <Text className="border-b border-white text-white">
        Thứ 7 - 05/10/2024
      </Text>
      <View className="gap-4 py-4">
        <View className="flex-row">
          <View className="mr-10 w-20">
            <Image source={booking} />
            <Image source={booking} className="absolute -bottom-6 -right-8"/>
          </View>
          <View>
            <Text className="text-lg line-clamp-1 text-white font-semibold">
              Gói trải bài tổng quan tuần
            </Text>
            <View className="flex-row justify-between mt-2">
              <Text className="text-white text-lg font-medium">Khách</Text>
              <Text className="text-white text-lg font-medium">
                Phương Khanh
              </Text>
            </View>
            <View className="flex-row justify-between mt-2">
              <Text className="text-white text-lg font-medium">Trạng thái</Text>
              <Text className="text-white text-lg font-medium">Hoàn thành</Text>
            </View>
          </View>
        </View>
        <View className="flex-row pt-6">
          <View className="mr-10 w-20">
            <Text className="text-white text-lg">Đánh giá</Text>
            <View className="flex-row gap-2">
              <AntDesign name="star" size={18} color="yellow" />
              <AntDesign name="star" size={18} color="yellow" />
              <AntDesign name="star" size={18} color="yellow" />
              <AntDesign name="star" size={18} color="yellow" />
            </View>
          </View>
          <Text className="text-white text-base flex-1">
            Mình rất hài lòng về dịch vụ xem Tarot trực tuyến. Reader còn tận
            tâm và trải bài cho mình rất kĩ. Những thông điệp cực kì đúng với
            mình luôn. Mình cũng sẽ trải nghiệm thêm các gói trải bài khác nữa!
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HistoryInfo;
