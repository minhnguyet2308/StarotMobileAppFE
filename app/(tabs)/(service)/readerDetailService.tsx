import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/type/navigation";
import { Reader } from "@/type/Reader.type";
import axios from "axios";
import { t } from "react-native-tailwindcss";
import { Star, X } from "lucide-react-native";
import { ReaderRating } from "@/type/ReaderRating.type";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";


export default function Component({
  initialReader = null,
}: {
  initialReader?: Reader | null;
}) {
  const route =
    useRoute<RouteProp<RootStackParamList, "ReaderDetailService">>();
  const { readerId } = route.params;
  const navigation = useNavigation();

  const [readers, setReaders] = useState<Reader[]>([]);
  const [selectedReader, setSelectedReader] = useState<Reader | null>(
    initialReader
  );
  const [reviews, setReviews] = useState<ReaderRating[]>([]);

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

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `https://exestarotapi20241021202520.azurewebsites.net/api/v1/feedback?ReaderId=${readerId}`
      );

      if (Array.isArray(response.data.data)) {
        setReviews(response.data.data);
      } else {
        console.error("API returned non-array data:", response.data);
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    }
  };

  useEffect(() => {
    fetchReaders();
    fetchReviews();
  }, []);

  useEffect(() => {
    const reader = readers.find((reader) => reader.readerId === readerId);
    if (reader) {
      setSelectedReader(reader);
    }
  }, [readers, readerId]);

  if (!selectedReader) {
    return <Text>Reader not found</Text>;
  }

  const renderReview = ({ item }: { item: ReaderRating }) => (
    <View style={[t.mB4, t.p4, t.bgGray100, t.rounded]}>
      <View style={[t.flexRow, t.itemsCenter, t.mB2]}>
        <Image
          source={{ uri: item.customerImage }}
          style={[t.w10, t.h10, t.roundedFull, t.mR2]}
        />
        <View>
          <Text style={[t.fontBold, t.textBase]}>Anonymous</Text>
          <View style={[t.flexRow]}>
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} size={16} color="#FFD700" fill="#FFD700" />
            ))}
          </View>
        </View>
      </View>
      <Text style={[t.textSm, { color: "#392C7A" }]}>{item.comment}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[t.flex1, t.bgWhite]}>
      <View style={[t.flexRow, t.justifyEnd, t.pX4]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View
            style={[
              t.w10,
              t.h10,
              t.roundedFull,
              t.bgWhite,
              t.shadow,
              t.justifyCenter,
              t.itemsCenter,
            ]}
          >
            <X size={24} color="#3014BA" />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={[t.p4, t.mB4, t.flexRow, t.itemsCenter]}>
          <View style={[t.relative]}>
            <Image
              source={{ uri: selectedReader.image }}
              style={[{ width: 120, height: 190 }, t.rounded, t.mR4]}
              resizeMode="cover"
            />
          </View>

          <View style={[t.flex1, t.justifyBetween]}>
            <Text style={[t.textLg, t.fontBold, t.mB10, { color: "#3014BA" }]}>
              {selectedReader.firstName} {selectedReader.lastName}
            </Text>
            <Text style={[t.textBase, { color: "#392C7A" }]}>
              <Text style={[t.fontBold]}>Lượt trải bài: </Text>
              {selectedReader.memberShip}
            </Text>
            <Text style={[t.textBase, { color: "#392C7A" }]}>
              <Text style={[t.fontBold]}>Đánh giá: </Text>
              {selectedReader.rating}/5
            </Text>
            <Text style={[t.textBase, { color: "#392C7A" }]}>
              <Text style={[t.fontBold]}>Chuyên môn: </Text>
              {selectedReader.expertise}
            </Text>
            <Text style={[t.textBase, { color: "#392C7A" }]}>
              <Text style={[t.fontBold]}>Quote: </Text>"{selectedReader.quote}"
            </Text>
          </View>
        </View>

        <View style={[t.p4, t.mB4]}>
          <Text style={[t.textLg, t.fontBold, t.mB2, { color: "#3014BA" }]}>
            GIỚI THIỆU
          </Text>
          <Text style={[t.textBase, { color: "#392C7A" }]}>
            {selectedReader.introduction}
          </Text>
        </View>

        <View style={[t.p4, t.mB4]}>
          <Text style={[t.textLg, t.fontBold, t.mB2, { color: "#3014BA" }]}>
            KINH NGHIỆM
          </Text>
          <Text style={[t.textBase, { color: "#392C7A" }]}>
            {selectedReader.experience}
          </Text>
        </View>

        <View style={[t.p4]}>
          <Text style={[t.textLg, t.fontBold, t.mB4, { color: "#3014BA" }]}>
            ĐÁNH GIÁ
          </Text>
          <FlatList
            data={reviews}
            renderItem={renderReview}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
