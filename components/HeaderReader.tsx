import { View, Text, Image } from "react-native";
import React from "react";
const logo = require("@/assets/images/logo.png");

const HeaderReader = ({ title = "LỊCH TRÌNH " }: { title?: string }) => {
  return (
    <View className="p-4">
      <Image source={logo} />
      <Text className="text-center text-3xl font-medium text-primary">
        {title}
      </Text>
    </View>
  );
};

export default HeaderReader;
