import HeightSpacer from "@/components/HeightSpacer";
import ResuableText from "@/components/ResuableText";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
const logo = require("@/assets/images/logo.png");

const userInfo = () => {
  return (
    <View className="p-4">
      <View className="mt-10 px-2 py-8">
        <Image
          source={logo}
          resizeMode="contain"
          className="h-10 border-none"
        />
      </View>
      <View className="flex-row justify-between items-center">
        <MaterialIcons
          name="keyboard-arrow-left"
          size={40}
          color="#3014BA"
          onPress={() => router.back()}
        />
        <ResuableText
          text="Thông tin cá nhân"
          fontFamily="SpaceMono"
          size={24}
          fontWeight="700"
          textAlign="start"
        />
        <View />
      </View>
      <HeightSpacer height={20} />
      <View>
        <View className="flex-row justify-between items-center gap-4">
          <View className="w-1/2">
            <ResuableText
              text="Họ"
              fontFamily="SpaceMono"
              size={16}
              fontWeight="700"
              textAlign="start"
            />
            <TextInput className="border border-second rounded-md px-2 py-1" />
          </View>
          <View className="flex-1">
            <ResuableText
              text="Tên"
              fontFamily="SpaceMono"
              size={16}
              fontWeight="700"
              textAlign="start"
            />
            <TextInput className="border border-second rounded-md px-2 py-1" />
          </View>
        </View>
        <HeightSpacer height={16} />
        <View className="w-full">
          <ResuableText
            text="Ngày sinh"
            fontFamily="SpaceMono"
            size={16}
            fontWeight="700"
            textAlign="start"
          />
          <TextInput className="border border-second rounded-md px-2 py-1" />
        </View>
        <HeightSpacer height={16} />
        <View className="w-full">
          <ResuableText
            text="Số điện thoại"
            fontFamily="SpaceMono"
            size={16}
            fontWeight="700"
            textAlign="start"
          />
          <TextInput className="border border-second rounded-md px-2 py-1" />
        </View>
        <HeightSpacer height={16} />
        <View className="w-full">
          <ResuableText
            text="Email"
            fontFamily="SpaceMono"
            size={16}
            fontWeight="700"
            textAlign="start"
          />
          <TextInput className="border border-second rounded-md px-2 py-1" />
        </View>
        <HeightSpacer height={16} />
        <TouchableOpacity className="justify-center items-center bg-second text-primary p-2 rounded-md">
          <ResuableText
            text="Lưu thay đổi"
            fontFamily="SpaceMono"
            size={16}
            fontWeight="700"
            textAlign="start"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default userInfo;
