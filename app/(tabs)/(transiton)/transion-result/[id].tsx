import HeightSpacer from "@/components/HeightSpacer";
import ResuableText from "@/components/ResuableText";
import ViewContainer from "@/components/ViewContainer";
import { getAllCard } from "@/service/cardSevice";
import { cardType, ResponseTypeOJPagi } from "@/utils/datatype";
import { AntDesign } from "@expo/vector-icons";
import { router, useGlobalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
const backFace = require("@/assets/images/backFace.png");

const TransionResult = () => {
  const { id } = useGlobalSearchParams();
  const [cardDetail, setCardDetail] = useState<cardType>();

  useEffect(() => {
    const fetchCards = async () => {
      const data = await getAllCard({
        Id: Number(id),
      });
      if (data.data?.length) {
        setCardDetail(data.data[0]);
      }
    };

    fetchCards();
  }, [id]);

  return cardDetail ? (
    <ViewContainer showFooter showHeader showLogo>
      <TouchableOpacity
        className="absolute left-4 top-10 z-10"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={() => {
          router.back();
        }}
      >
        <AntDesign name="back" size={30} color="#3014BA" />
      </TouchableOpacity>

      <View className="flex-1 justify-center items-center">
        <Image
          source={{
            uri: cardDetail.image,
          }}
          className="object-cover w-60 h-80"
        />
        <HeightSpacer height={20} />
        <ResuableText
          text={`${cardDetail?.name}`}
          fontFamily="SpaceMono"
          size={24}
          fontWeight="700"
          textAlign="center"
        />
        <HeightSpacer height={20} />
        <ResuableText
          text={cardDetail?.content || ""}
          fontFamily="SpaceMono"
          size={16}
          textAlign="center"
        />
      </View>
      <HeightSpacer height={50} />
    </ViewContainer>
  ) : null;
};

export default TransionResult;
