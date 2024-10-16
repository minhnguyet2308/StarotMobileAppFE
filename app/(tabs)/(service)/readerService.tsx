// ReaderService.js
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import { t } from "react-native-tailwindcss";
import { LinearGradient } from "expo-linear-gradient";
import { Reader } from "@/type/Reader.type";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/type/navigation";

type NavigationProps = StackNavigationProp<RootStackParamList>;

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

const ReaderService = () => {
  const navigation = useNavigation<NavigationProps>();

  const openReaderDetail = (reader: Reader) => {
    navigation.navigate("ReaderDetailService", { readerId: reader.id });
  };

  return (
    <SafeAreaView style={[t.flex1, t.bgWhite]}>
      <ScrollView contentContainerStyle={[t.p4, t.mY5]}>
        <View style={[t.mB10, t.flexRow]}>
          <TouchableOpacity style={[t.mR2]} onPress={() => navigation.goBack()}>
            <Icon name="angle-left" size={40} color="#3014BA" />
          </TouchableOpacity>
          <View style={[t.flex1]}>
            <Text
              style={[
                t.textXl,
                t.fontBold,
                { color: "#3014BA", textAlign: "center" },
              ]}
            >
              TAROT HEALING
            </Text>
            <Text style={[t.textBase, { textAlign: "center" }]}>
              Hãy chọn Tarot Reader mà bạn muốn!
            </Text>
          </View>
        </View>

        {readers.map((reader) => (
          <View
            key={reader.id}
            style={[
              t.bgWhite,
              t.roundedLg,
              t.shadow,
              t.p4,
              t.mB4,
              t.border,
              t.borderGray300,
              t.flexRow,
              t.itemsCenter,
            ]}
          >
            <View style={[t.relative]}>
              <TouchableOpacity onPress={() => openReaderDetail(reader)}>
                <Image
                  source={{ uri: reader.imageUrl }}
                  style={[{ width: 120, height: 190 }, t.rounded, t.mR4]}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={[
                    "hsla(0, 3.6144578313253053%, 67.45098039215686%, 0.151)",
                    "rgba(0, 0, 0, 0.774)",
                  ]}
                  style={{
                    position: "absolute",
                    width: 120,
                    height: 190,
                    borderRadius: 5,
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      width: 70,
                      textAlign: "center",
                      marginBottom: 15,
                    }}
                  >
                    Chi tiết về Reader
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={[t.flex1, t.justifyBetween]}>
              <Text style={[t.textLg, t.fontBold, { color: "#3014BA" }]}>
                {reader.name}
              </Text>
              <Text style={[t.textBase, { color: "#392C7A" }]}>
                <Text style={[t.fontBold]}>Lượt trải bài: </Text>
                {reader.readings}
              </Text>
              <Text style={[t.textBase, { color: "#392C7A" }]}>
                <Text style={[t.fontBold]}>Đánh giá: </Text>
                {reader.rating}
              </Text>
              <Text style={[t.textBase, { color: "#392C7A" }]}>
                <Text style={[t.fontBold]}>Chuyên môn: </Text>
                {reader.specialty}
              </Text>
              <Text style={[t.textBase, { color: "#392C7A" }]}>
                <Text style={[t.fontBold]}>Quote: </Text>"{reader.quote}"
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReaderService;
