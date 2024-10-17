import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
const logo = require("@/assets/images/logo.png");

const HeaderUser = ({ title = "LỊCH TRÌNH " }: { title?: string }) => {
  return (
    <View className="p-4">
      <Image source={logo} />
      <View className="flex-row justify-between items-center">
        <TouchableOpacity
          className="rounded-lg mt-1"
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={30} color={"#3014BA"} />
        </TouchableOpacity>
        <Text className="text-center text-2xl font-semibold text-primary">
          {title}
        </Text>
        <View />
      </View>
    </View>
  );
};

export default HeaderUser;
