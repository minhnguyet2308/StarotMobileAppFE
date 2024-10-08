import { View, Image } from "react-native";
import React from "react";
import ViewContainer from "@/components/ViewContainer";
import ResuableText from "@/components/ResuableText";

const transitonLove = require("@/assets/images/transitonlove.png");
const transitonHealth = require("@/assets/images/transitonhealth.png");
const transitonCareer = require("@/assets/images/transitoncareer.png");

const HomeScreen = () => {
  return (
    <ViewContainer showLogo>
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

      <View className={`mt-6`}>
        <ResuableText
          text="TRẠM CHỮA LÀNH"
          fontFamily="SpaceMono"
          fontWeight="700"
          size={23}
        />
      </View>
    </ViewContainer>
  );
};

export default HomeScreen;
