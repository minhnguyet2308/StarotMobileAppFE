import HeightSpacer from "@/components/HeightSpacer";
import ResuableText from "@/components/ResuableText";
import ResuableTitile from "@/components/ResuableTitile";
import ViewContainer from "@/components/ViewContainer";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
const logo = require("@/assets/images/logo.png");
const appIcon = require("@/assets/images/appIcon.png");

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <ViewContainer>
      <View className="mt-10 px-2 py-8">
        <Image
          source={logo}
          resizeMode="contain"
          className="h-10 border-none"
        />
      </View>
      <View>
        <View className="justify-center items-center">
          <Image source={appIcon} resizeMode="contain" className="h-28 " />
        </View>
        <HeightSpacer height={10} />
        <ResuableText
          text="TRẦN HIẾU NGHĨA"
          fontFamily="SpaceMono"
          fontWeight="700"
          size={23}
        />
        <HeightSpacer height={14} />
        <View className="justify-start items-start p-4">
          <ResuableText
            text="CÁ NHÂN"
            fontFamily="SpaceMono"
            fontWeight="700"
            size={20}
            textAlign="start"
          />
          <View className="border-b border-color_primary opacity-60 w-full h-1" />
          <TouchableOpacity onPress={() => router.push("/user-info")}>
            <HeightSpacer height={14} />
            <ResuableTitile
              color="#392C7A"
              text="Thông tin cá nhân"
              fontFamily="SpaceMono"
              size={16}
              textAlign="start"
              iconRight={
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={28}
                  color="black"
                />
              }
            />
            <HeightSpacer height={14} />
          </TouchableOpacity>
          <View className="border-b border-color_primary opacity-60 w-full h-1" />
          <HeightSpacer height={14} />
          <TouchableOpacity
            onPress={() => navigation.navigate("ReaderNav", {})}
          >
            <ResuableTitile
              color="#392C7A"
              text="Lịch xem Tarot"
              fontFamily="SpaceMono"
              size={16}
              textAlign="start"
              iconRight={
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={28}
                  color="black"
                />
              }
            />
          </TouchableOpacity>
          <HeightSpacer height={14} />
          <View className="border-b border-color_primary opacity-60 w-full h-1" />
          <HeightSpacer height={14} />
          <ResuableTitile
            color="#392C7A"
            text="Lịch sử Đặt lịch"
            fontFamily="SpaceMono"
            size={16}
            textAlign="start"
            iconRight={
              <MaterialIcons
                name="keyboard-arrow-right"
                size={28}
                color="black"
              />
            }
          />
          <HeightSpacer height={14} />
          <View className="border-b border-color_primary opacity-60 w-full h-1" />
          <HeightSpacer height={14} />
          <ResuableTitile
            color="#392C7A"
            text="Lịch sử Mua hàng"
            fontFamily="SpaceMono"
            size={16}
            textAlign="start"
            iconRight={
              <MaterialIcons
                name="keyboard-arrow-right"
                size={28}
                color="black"
              />
            }
          />
          <HeightSpacer height={14} />
          <View className="border-b border-color_primary opacity-60 w-full h-1" />
          <HeightSpacer height={14} />
          <ResuableText
            text="THÔNG TIN"
            fontFamily="SpaceMono"
            fontWeight="700"
            size={20}
            textAlign="start"
          />
          <HeightSpacer height={14} />
          <View className="border-b border-color_primary opacity-60 w-full h-1" />
          <HeightSpacer height={14} />
          <ResuableTitile
            color="#392C7A"
            text="Về Starot"
            fontFamily="SpaceMono"
            size={16}
            textAlign="start"
            iconRight={
              <MaterialIcons
                name="keyboard-arrow-right"
                size={28}
                color="black"
              />
            }
          />
          <HeightSpacer height={14} />
          <View className="border-b border-color_primary opacity-60 w-full h-1" />
          <HeightSpacer height={14} />
          <ResuableTitile
            color="#392C7A"
            text="Chính sách"
            fontFamily="SpaceMono"
            size={16}
            textAlign="start"
            iconRight={
              <MaterialIcons
                name="keyboard-arrow-right"
                size={28}
                color="black"
              />
            }
          />
          <HeightSpacer height={14} />
          <View className="border-b border-color_primary opacity-60 w-full h-1" />
          <HeightSpacer height={14} />
          <ResuableTitile
            color="#392C7A"
            text="Liên hệ"
            fontFamily="SpaceMono"
            size={16}
            textAlign="start"
            iconRight={
              <MaterialIcons
                name="keyboard-arrow-right"
                size={28}
                color="black"
              />
            }
          />
        </View>
      </View>
    </ViewContainer>
  );
};

export default ProfileScreen;
