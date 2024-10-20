import HeightSpacer from "@/components/HeightSpacer";
import ResuableText from "@/components/ResuableText";
import ResuableTitile from "@/components/ResuableTitile";
import ViewContainer from "@/components/ViewContainer";
import { useAuth } from "@/context/authContext";
import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Linking, TouchableOpacity, View } from "react-native";
const logo = require("@/assets/images/logo.png");
const appIcon = require("@/assets/images/appIcon.png");

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  return (
    <ViewContainer>
      <View className="mt-10 px-2 py-8 flex-row justify-between items-center">
        <Image
          source={logo}
          resizeMode="contain"
          className="h-10 border-none"
        />
        <TouchableOpacity onPress={() => logout()}>
          <MaterialIcons name="logout" size={30} color="#3014BA" />
        </TouchableOpacity>
      </View>
      <View>
        <View className="justify-center items-center">
          <Image source={appIcon} resizeMode="contain" className="h-28 " />
        </View>
        <HeightSpacer height={10} />
        <ResuableText
          text={user?.name}
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
          <TouchableOpacity onPress={() => router.push("/schedule")}>
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
          <TouchableOpacity
            onPress={() => router.push("/(user)/history-booking")}
          >
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
          </TouchableOpacity>
          <HeightSpacer height={14} />
          <View className="border-b border-color_primary opacity-60 w-full h-1" />
          <HeightSpacer height={14} />
          <TouchableOpacity
            onPress={() => router.push("/(user)/history-order")}
          >
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
          </TouchableOpacity>
          <HeightSpacer height={14} />
          <View className="border-b border-color_primary opacity-60 w-full h-1" />
          <HeightSpacer height={14} />
          <TouchableOpacity onPress={() => router.push("/payment-wallet")}>
            <ResuableTitile
              color="#392C7A"
              text="Ví Starot"
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
          <TouchableOpacity onPress={() => logout()}>
            <ResuableTitile
              color="#392C7A"
              text="Đăng xuất"
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
          <TouchableOpacity
            className="flex-row items-center pr-6"
            onPress={() => Linking.openURL("https://starotvn.com")}
          >
            <MaterialCommunityIcons name="web-sync" size={24} color="#392C7A" />
            <ResuableTitile
              moreStyles={{ flex: 1, paddingLeft: 4 }}
              color="#392C7A"
              text="Website"
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
          <TouchableOpacity
            className="flex-row items-center pr-6"
            onPress={() =>
              Linking.openURL(
                "https://www.facebook.com/people/Starot/61565914032381/"
              )
            }
          >
            <FontAwesome5 name="facebook-square" size={24} color="#392C7A" />
            <ResuableTitile
              color="#392C7A"
              text="Facebook"
              fontFamily="SpaceMono"
              size={16}
              moreStyles={{ flex: 1, paddingLeft: 4 }}
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
          <TouchableOpacity
            className="flex-row items-center pr-6"
            onPress={() =>
              Linking.openURL("https://www.instagram.com/starot_1/")
            }
          >
            <Entypo name="instagram" size={24} color="#392C7A" />
            <ResuableTitile
              color="#392C7A"
              text="Instagram"
              fontFamily="SpaceMono"
              size={16}
              moreStyles={{ flex: 1, paddingLeft: 4 }}
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
        </View>
      </View>
    </ViewContainer>
  );
};

export default ProfileScreen;
