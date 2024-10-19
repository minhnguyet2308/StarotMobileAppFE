import { View, Text, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const HistoryInfo = ({
  date,
  packageName,
  customerName,
  status,
  rating,
  review,
  image,
}: {
  date: string;
  packageName: string;
  customerName: string;
  status: string;
  rating: number; // Cập nhật kiểu dữ liệu của rating thành number
  review: string;
  image: any;
}) => {
  return (
    <View className="bg-primary p-4 mb-2">
      <Text className="border-b border-white text-white">{date}</Text>
      <View className="gap-4 py-4">
        <View className="flex-row">
          <View className="mr-10 w-20">
            <Image source={image} />
            <Image source={image} className="absolute -bottom-6 -right-8" />
          </View>
          <View>
            <Text className="text-lg line-clamp-1 text-white font-semibold">
              {packageName}
            </Text>
            <View className="flex-row justify-between mt-2">
              <Text className="text-white text-lg font-medium">Khách</Text>
              <Text className="text-white text-lg font-medium">
                {customerName}
              </Text>
            </View>
            <View className="flex-row justify-between mt-2">
              <Text className="text-white text-lg font-medium">Trạng thái</Text>
              <Text className="text-white text-lg font-medium">{status}</Text>
            </View>
          </View>
        </View>
        <View className="flex-row pt-6">
          <View className="mr-10 w-20">
            <Text className="text-white text-lg">Đánh giá</Text>
            <View className="flex-row gap-2">
              {[...Array(rating)].map((_, index) => (
                <AntDesign key={index} name="star" size={16} color="yellow" />
              ))}
              {[...Array(5 - rating)].map((_, index) => (
                <AntDesign key={index} name="staro" size={16} color="yellow" />
              ))}
            </View>
          </View>
          <Text className="text-white text-base flex-1">{review}</Text>
        </View>
      </View>
    </View>
  );
};

export default HistoryInfo;
