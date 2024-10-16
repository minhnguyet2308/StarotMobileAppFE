// ReaderDetailService.tsx
import React from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/type/navigation";
import { Reader } from "@/type/Reader.type";

const ReaderDetailService = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, "ReaderDetailService">>();
  const { readerId } = route.params;

  const readers: Reader[] = [
    {
      id: "1",
      name: "AMI",
      readings: 100,
      rating: "5/5",
      specialty: "Tarot, Bàn đồ sao",
      quote: "Làm tốt để làm khác",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/starot-aa9da.appspot.com/o/Readers%2FReader1.png?alt=media&token=19b96f5f-6fdd-42fd-9839-fb65c41463ce",
    },
    {
      id: "2",
      name: "JULEE",
      readings: 93,
      rating: "5/5",
      specialty: "Tarot, Tử vi",
      quote: "No Tarot, no life",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/starot-aa9da.appspot.com/o/Readers%2FReader2.png?alt=media&token=a55601dd-1bd1-4beb-ac07-3947d3fc99d2",
    },
    {
      id: "3",
      name: "ALICE",
      readings: 90,
      rating: "5/5",
      specialty: "Tarot",
      quote: "Your soul need yourself",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/starot-aa9da.appspot.com/o/Readers%2FReader3.png?alt=media&token=4b01a2ab-1cc0-4088-b8fc-c02455b7415c",
    },
    {
      id: "4",
      name: "MEI FANG",
      readings: 50,
      rating: "4/5",
      specialty: "Tarot, bài Tây",
      quote: "Dân chơi không sợ mưa rơi",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/starot-aa9da.appspot.com/o/Readers%2FReader4.png?alt=media&token=5914cbbb-1d62-4485-ab0b-e9b602581991",
    },
    {
      id: "5",
      name: "LINGLING",
      readings: 20,
      rating: "4/5",
      specialty: "Tarot, Bài Clow",
      quote: "Mỗi lá bài, một câu chuyện",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/starot-aa9da.appspot.com/o/Readers%2FReader5.png?alt=media&token=19269f1f-39ea-4b70-9677-b9dd7297f977",
    },
  ];

  const selectedReader = readers.find((reader) => reader.id === readerId);

  return (
    <SafeAreaView>
      {selectedReader ? (
        <View>
          <Text>{selectedReader.name}</Text>
          <Image source={{ uri: selectedReader.imageUrl }} />
          <Text>{selectedReader.quote}</Text>
        </View>
      ) : (
        <Text>Reader not found</Text>
      )}
    </SafeAreaView>
  );
};

export default ReaderDetailService;
