import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import ViewContainer from "@/components/ViewContainer";
import ResuableText from "@/components/ResuableText";
import HeightSpacer from "@/components/HeightSpacer";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
const backFace = require("@/assets/images/backFace.png");

const TransionResult = () => {
  return (
    <ViewContainer showFooter showHeader showLogo isScroll={false}>
      <TouchableOpacity
        className="absolute left-4 -top-10 p-2"
        onPress={() => {
          router.push("/transiton");
        }}
      >
        <AntDesign name="back" size={30} color="#3014BA" />
      </TouchableOpacity>

      <Image source={backFace} className="object-cover" />
      <HeightSpacer height={20} />
      <ResuableText
        text="THE LOVERS"
        fontFamily="SpaceMono"
        size={24}
        fontWeight="700"
        textAlign="start"
      />
      <HeightSpacer height={20} />
      <ResuableText
        text="Tarot Tình yêu lãng mạn The Lovers xuôi cho thấy một tình yêu đầy đam mê, mãnh liệt và sâu sắc đang chờ đón bạn. Đây là giai đoạn mà trái tim bạn ngập tràn hạnh phúc, khi được kết nối và gắn bó với một nửa của mình. Sự xuất hiện của lá bài này báo hiệu một mối quan hệ lãng mạn đầy hứa hẹn và có triển vọng phát triển lâu dài."
        fontFamily="SpaceMono"
        size={16}
        textAlign="center"
      />
    </ViewContainer>
  );
};

export default TransionResult;
