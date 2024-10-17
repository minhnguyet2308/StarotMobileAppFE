import HeightSpacer from "@/components/HeightSpacer";
import ViewContainer from "@/components/ViewContainer";
import { getAllCard } from "@/service/cardSevice";
import { cardType, ResponseTypeOJPagi } from "@/utils/datatype";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Image,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";

const fontHealt = require("@/assets/images/fontHealt.png");

const TransionHealth = () => {
  const [listCard, setListCard] = useState<cardType[]>([]);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [animatedValues, setAnimatedValues] = useState<Animated.Value[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      const data: ResponseTypeOJPagi<cardType[]> = await getAllCard({
        Type: "Sức Khỏe",
      });
      if (data.data?.length) {
        setListCard(data.data);
        setAnimatedValues(data.data.map(() => new Animated.Value(0)));
      }
    };

    fetchCards();
  }, []);

  const handleFlip = (card: cardType, index: number) => {
    if (flippedIndex === index) {
      router.push(`/transion-result/${card.id}`);
    } else {
      if (flippedIndex !== null) {
        Animated.timing(animatedValues[flippedIndex], {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }

      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      setFlippedIndex(index);
    }
  };

  const renderCard = (card: cardType, index: number) => {
    if (!animatedValues[index]) {
      return null;
    }

    const rotateY = animatedValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"],
    });

    const backRotateY = animatedValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: ["180deg", "0deg"],
    });

    return (
      <TouchableWithoutFeedback
        onPress={() => handleFlip(card, index)}
        key={index}
      >
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
              source={{
                uri: card.image,
              }}
              className="object-cover w-full h-full rounded-md"
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <ViewContainer showFooter showHeader showLogo>
      <View className="flex-col items-center w-full">
        {listCard.length > 0 ? (
          <View className="flex-row flex-wrap justify- items-center">
            {listCard.map((card, index) => (
              <View className="w-1/2 p-2 items-center" key={index}>
                {renderCard(card, index)}
                <HeightSpacer height={26} />
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text>Không có thẻ nào để hiển thị</Text>
          </View>
        )}
      </View>

      <HeightSpacer height={64} />
    </ViewContainer>
  );
};

export default TransionHealth;
