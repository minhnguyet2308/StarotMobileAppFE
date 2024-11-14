import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import { t } from "react-native-tailwindcss";
import { LinearGradient } from "expo-linear-gradient";
import { Reader } from "@/type/Reader.type";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/type/navigation";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NavigationProps = StackNavigationProp<RootStackParamList>;

const ReaderService = () => {
  const navigation = useNavigation<NavigationProps>();
  const [readers, setReaders] = useState<Reader[]>([]);

  const fetchReaders = async () => {
    try {
      const response = await axios.get(
        "https://exestarotapi20241021202520.azurewebsites.net/api/v1/reader"
      );

      if (Array.isArray(response.data.data)) {
        setReaders(response.data.data);
      } else {
        console.error("API returned non-array data:", response.data);
        setReaders([]);
      }
    } catch (error) {
      console.error("Error fetching readers:", error);
      setReaders([]);
    }
  };

  useEffect(() => {
    fetchReaders();
  }, []);

  const openReaderDetail = async(reader: Reader) => {
    await AsyncStorage.setItem("ReaderId", reader.readerId);
    navigation.navigate("ReaderDetailService", { readerId: reader.readerId });
  };

  const openReaderServiceBooking = async(reader: Reader) => {
    await AsyncStorage.setItem("ReaderId", reader.readerId);
    navigation.navigate("ReaderServiceBooking", { readerId: reader.readerId });
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

            <TouchableOpacity
              style={[t.flex1, t.justifyBetween]}
              onPress={() => openReaderServiceBooking(reader)}
            >
              <Text style={[t.textLg, t.fontBold, { color: "#3014BA" }]}>
                {reader.firstName} {reader.lastName}
              </Text>
              <Text style={[t.textBase, { color: "#392C7A" }]}>
                <Text style={[t.fontBold]}>Lượt trải bài: </Text>
                {reader.memberShip}
              </Text>
              <Text style={[t.textBase, { color: "#392C7A" }]}>
                <Text style={[t.fontBold]}>Đánh giá: </Text>
                {reader.rating}/5
              </Text>
              <Text style={[t.textBase, { color: "#392C7A" }]}>
                <Text style={[t.fontBold]}>Chuyên môn: </Text>
                {reader.expertise}
              </Text>
              <Text style={[t.textBase, { color: "#392C7A" }]}>
                <Text style={[t.fontBold]}>Quote: </Text>"{reader.quote}"
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReaderService;
