import HeightSpacer from "@/components/HeightSpacer";
import ResuableText from "@/components/ResuableText";
import ViewContainer from "@/components/ViewContainer";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
const transitonLove = require("@/assets/images/transitonlove.png");
const transitonHealth = require("@/assets/images/transitonhealth.png");
const transitonCareer = require("@/assets/images/transitoncareer.png");
const Transiton = () => {
  const [isVertical, setIsVertical] = useState(false);
  useEffect(() => {
    const timeId = setTimeout(() => {
      setIsVertical(true);
    }, 500);
    () => clearTimeout(timeId);
  }, []);
  const cardStyleCenter = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(isVertical ? -100 : 0) },
        { translateX: withTiming(isVertical ? 0 : 0) },
      ],
    };
  });

  const cardStyleRight = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(isVertical ? 130 : 0) },
        { translateX: withTiming(isVertical ? -50 : 0) },
      ],
    };
  });
  const cardStyleLeft = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(isVertical ? 130 : 0) },
        { translateX: withTiming(isVertical ? 50 : 0) },
      ],
    };
  });
  return (
    <ViewContainer showFooter showHeader showLogo isScroll={false}>
      <View className={`flex-1 justify-center items-center w-full`}>
        <View
          className={`flex-row justify-center items-center relative w-full`}
        >
          <Animated.View style={cardStyleLeft} className="absolute z-0 -left-6">
            <TouchableOpacity onPress={() => router.push("/transion-health")}>
              <Image source={transitonHealth} resizeMode="cover" />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={cardStyleCenter} className="z-10">
            <TouchableOpacity onPress={() => router.push("/transion-love")}>
              <Image source={transitonLove} resizeMode="contain" />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={cardStyleRight}
            className="absolute z-0 -right-6"
          >
            <TouchableOpacity onPress={() => router.push("/transion-career")}>
              <Image source={transitonCareer} resizeMode="cover" />
            </TouchableOpacity>
          </Animated.View>
        </View>
        <HeightSpacer height={32} />
        {isVertical ? (
          <>
            <HeightSpacer height={60} />
            <ResuableText
              text="Hãy chọn một tụ bài!"
              fontFamily="SpaceMono"
              size={20}
              fontWeight="500"
              textAlign="center"
            />
          </>
        ) : (
          <ResuableText
            text="TRẠM CHỮA LÀNH"
            fontFamily="SpaceMono"
            size={24}
            fontWeight="700"
            textAlign="start"
          />
        )}
      </View>
    </ViewContainer>
  );
};

export default Transiton;
