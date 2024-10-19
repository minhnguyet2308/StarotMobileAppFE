import ResuableText from "@/components/ResuableText";
import ViewContainer from "@/components/ViewContainer";
import { useAuth } from "@/context/authContext";
import { getUserInfo } from "@/service/authSevice";
import { FONTFAMILY } from "@/utils/theme";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Image, TouchableOpacity, View } from "react-native";

const transitonLove = require("@/assets/images/transitonlove.png");
const transitonHealth = require("@/assets/images/transitonhealth.png");
const transitonCareer = require("@/assets/images/transitoncareer.png");
const handhome = require("@/assets/images/handhome.png");
const starotflt = require("@/assets/images/starotflt.png");
const BLUEELEMENT = require("@/assets/images/BLUEELEMENT.png");
const BLUEELEMENTLG = require("@/assets/images/BLUEELEMENTLG.png");
const logo = require("@/assets/images/logo.png");

const HomeScreen = () => {
  const { user } = useAuth();

  return (
    <ViewContainer showLogo showFooter>
      <View className="mt-10 px-2 py-8 justify-start items-start">
        <Image
          source={logo}
          resizeMode="contain"
          className="h-10 border-none"
        />
      </View>
      <View className="justify-center items-center">
        <View>
          <ResuableText
            text="Xin chào"
            size={20}
            fontFamily={FONTFAMILY.SpaceMono}
          />
          <ResuableText
            text={`${user?.name}!`}
            size={20}
            fontFamily={FONTFAMILY.SpaceMono}
          />
        </View>
        <View className="-mt-20">
          <Image source={handhome} width={100} />
        </View>
      </View>
      <TouchableOpacity onPress={() => router.push("/transiton")}>
        <View className={`flex-1 justify-center items-center w-full`}>
          <View
            className={`flex-row justify-center items-center relative w-full`}
          >
            <View className="absolute z-0 -left-6">
              <Image source={transitonHealth} resizeMode="cover" />
            </View>
            <Image
              source={transitonLove}
              className={`h-[250px] z-10`}
              resizeMode="cover"
            />
            <View className="absolute z-0 -right-6">
              <Image source={transitonCareer} resizeMode="cover" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View className={`mt-6 justify-center items-center mb-20`}>
        <ResuableText
          text="TRẠM CHỮA LÀNH"
          fontFamily="SpaceMono"
          fontWeight="700"
          size={23}
        />
        <ResuableText
          text="Ngày hôm nay của bạn thế nào?
Mong những lá bài này có thể xoa dịu tâm hồn bạn nha ^^"
          fontFamily="SpaceMono"
          size={18}
        />
        <Image source={BLUEELEMENT} resizeMode="cover" className="my-14" />
        <Image source={BLUEELEMENTLG} resizeMode="cover" className="my-4" />
        <ResuableText
          text="TAROT HEALING"
          fontFamily="SpaceMono"
          fontWeight="700"
          size={23}
        />
        <ResuableText
          text="Tarot Healing là dịch vụ xem tarot một một với những Reader tận tâm và dày dặn kinh nghiệm trong lĩnh vực Tarot. Sự đa dạng trong các gói trải bài cùng với thời gian được hoàn toàn 
chủ động bởi các bạn."
          fontFamily="SpaceMono"
          size={16}
        />
      </View>
    </ViewContainer>
  );
};

export default HomeScreen;
