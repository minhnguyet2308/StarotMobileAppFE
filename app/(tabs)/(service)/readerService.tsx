// ReaderService.js
import React, { useEffect, useState } from "react";
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

const [readers, setReaders] = useState<Reader[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchReaders = async () => {
    try {
      const response = await fetch(
        "https://exestarotapi20241007212754.azurewebsites.net/api/v1/reader"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setReaders(data.data);
    } finally {
      setLoading(false);
    }
  };

  fetchReaders();
}, []);

const ReaderService = () => {
  const navigation = useNavigation<NavigationProps>();

  const openReaderDetail = (reader: Reader) => {
    navigation.navigate("ReaderDetailService", { readerId: reader.readerId });
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
            key={reader.readerId}
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
                  source={{ uri: reader.image }}
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
                {reader.firstName} {reader.lastName}
              </Text>
              <Text style={[t.textBase, { color: "#392C7A" }]}>
                <Text style={[t.fontBold]}>Lượt trải bài: </Text>
                0
              </Text>
              <Text style={[t.textBase, { color: "#392C7A" }]}>
                <Text style={[t.fontBold]}>Đánh giá: </Text>
                {reader.rating}
              </Text>
              <Text style={[t.textBase, { color: "#392C7A" }]}>
                <Text style={[t.fontBold]}>Chuyên môn: </Text>
                {reader.expertise}
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
