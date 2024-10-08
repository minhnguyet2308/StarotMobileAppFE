import {
  View,
  Image,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import ViewContainer from "@/components/ViewContainer";
import HeightSpacer from "@/components/HeightSpacer";
import { router } from "expo-router";

const fontHealt = require("@/assets/images/fontHealt.png");
const backFace = require("@/assets/images/backFace.png");

const TransionHealth = () => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const animatedValues = useRef<Array<Animated.Value>>(
    Array(8)
      .fill(0)
      .map(() => new Animated.Value(0))
  );

  const handleFlip = (index: number) => {
    if (flippedIndex === index) {
      router.push("/transion-result");
    } else {
      if (flippedIndex !== null) {
        Animated.timing(animatedValues.current[flippedIndex], {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }

      Animated.timing(animatedValues.current[index], {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      setFlippedIndex(index);
    }
  };

  const renderCard = (index: number) => {
    const rotateY = animatedValues.current[index].interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"],
    });

    const backRotateY = animatedValues.current[index].interpolate({
      inputRange: [0, 1],
      outputRange: ["180deg", "0deg"],
    });

    return (
      <TouchableWithoutFeedback onPress={() => handleFlip(index)}>
        <View className="relative w-36 h-56 shadow-md shadow-gray-400">
          <Animated.View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              borderRadius: 10,
              transform: [{ rotateY }],
            }}
          >
            <Image
              source={fontHealt}
              className="object-cover w-full h-full rounded-md"
            />
          </Animated.View>
          <Animated.View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              borderRadius: 10,
              transform: [{ rotateY: backRotateY }],
            }}
          >
            <Image
              source={backFace}
              className="object-cover w-full h-full rounded-md"
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <ViewContainer showFooter showHeader showLogo>
      <View className="flex-row gap-4 justify-center items-center">
        {renderCard(0)}
        {renderCard(1)}
      </View>
      <HeightSpacer height={26} />
      <View className="flex-row gap-4 justify-center items-center">
        {renderCard(2)}
        {renderCard(3)}
      </View>
      <HeightSpacer height={26} />
      <View className="flex-row gap-4 justify-center items-center">
        {renderCard(4)}
        {renderCard(5)}
      </View>
      <HeightSpacer height={26} />
      <View className="flex-row gap-4 justify-center items-center">
        {renderCard(6)}
        {renderCard(7)}
      </View>
      <HeightSpacer height={64} />
    </ViewContainer>
  );
};

export default TransionHealth;
