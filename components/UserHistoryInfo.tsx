import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

type UserHistoryInfoProps = {
  date: string;
  status: string;
  packageName: string;
  readerName: string;
  time: string;
  price: string;
  image: ImageSourcePropType;
};

const UserHistoryInfo: React.FC<UserHistoryInfoProps> = ({
  date,
  status,
  packageName,
  readerName,
  time,
  price,
  image,
}) => {
  return (
    <View className="bg-white p-4 mb-2">
      <View className="flex-row justify-between pb-2 border-b border-b-primary">
        <Text className="text-primary font-semibold">{date}</Text>
        <Text className="text-yellow-500 font-semibold">{status}</Text>
      </View>
      <View className="gap-4 py-4">
        <View className="flex-row">
          <View className="mr-10 w-20">
            <Image source={image} />
            <Image source={image} className="absolute -bottom-6 -right-8" />
          </View>
          <View>
            <Text className="text-lg line-clamp-1 text-primary font-semibold">
              {packageName}
            </Text>
            <View className="flex-row justify-between mt-2">
              <Text className="text-[#392c7a] text-lg">Reader</Text>
              <Text className="text-primary text-lg font-medium">
                {readerName}
              </Text>
            </View>
            <View className="flex-row justify-between mt-2">
              <Text className="text-[#392c7a] text-lg">Thời gian</Text>
              <Text className="text-primary text-lg font-medium">{time}</Text>
            </View>
            <View className="flex-row justify-between mt-2">
              <Text className="text-[#392c7a] text-lg">Thành tiền</Text>
              <Text className="text-primary text-lg font-medium">{price}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default UserHistoryInfo;
