import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";

type NotiInfoProps = {
  customerName: string;
  message: string;
  time: string;
  image: ImageSourcePropType;
};

const NotiInfo: React.FC<NotiInfoProps> = ({
  customerName,
  message,
  time,
  image,
}) => {
  return (
    <View className="flex-row items-center bg-white mt-2 rounded-lg">
      <Image source={image} className="w-16 h-16 rounded-full" />
      <View className="flex-1 ml-2">
        <Text className="font-semibold text-lg text-primary">
          {customerName}
          <Text className="font-normal text-primary">{message}</Text>
        </Text>
        <Text className="text-sm text-primary mt-1">{time}</Text>
      </View>
    </View>
  );
};

export default NotiInfo;
