import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { t } from "react-native-tailwindcss";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PackageCardProps {
  title: string;
  description: string;
  price: string;
  imageURL: string;
  onPress: () => void;
}

interface TarotHealingScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const PackageCard: React.FC<PackageCardProps> = ({
  title,
  price,
  description,
  imageURL,
  onPress,
}) => (
  <View
    style={[
      t.bgWhite,
      t.roundedLg,
      t.shadow,
      t.p4,
      t.mB4,
      t.border,
      t.borderGray300,
    ]}
  >
    <View style={[t.flexRow]}>
      <Image
        source={{ uri: imageURL }}
        style={[{ flex: 1, height: 300 }, t.mR4]}
        resizeMode="cover"
      />
      <View style={[t.flex1, t.justifyBetween]}>
        <Text style={[t.textLg, t.fontBold, { color: "#3014BA" }, t.mB1]}>
          {title}
        </Text>
        <Text style={[t.textBase, { color: "#3014BA" }, t.fontBold, t.mB1]}>
          {price} VND
        </Text>
        <Text style={[t.textSm, t.textGray600, t.mB2]}>{description}</Text>
        <TouchableOpacity
          style={[
            { backgroundColor: "#3014BA" },
            t.roundedFull,
            t.pY2,
            t.pX4,
            t.selfStart,
          ]}
          onPress={onPress}
        >
          <Text style={[t.textWhite, t.fontBold]}>Chọn</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default function TarotHealingScreen({
  navigation,
}: TarotHealingScreenProps) {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          "https://670a3386af1a3998baa35682.mockapi.io/starot/dichvus"
        );
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handlePress = async (packageId: string) => {
    try {
      await AsyncStorage.setItem("selectedPackageId", packageId);

      navigation.navigate("ReaderService");
    } catch (error) {
      console.error("Error storing packageId:", error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[t.flex1, t.bgWhite, t.itemsCenter, t.justifyCenter]}
      >
        <ActivityIndicator size="large" color="#3014BA" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[t.flex1, t.bgWhite]}>
      <ScrollView contentContainerStyle={[t.p4]}>
        <View style={[t.flex1, t.itemsCenter, t.justifyCenter, t.p4]}>
          <Text
            style={[
              t.textXl,
              t.fontBold,
              t.mB1,
              { color: "#3014BA", textAlign: "center" },
            ]}
          >
            TAROT HEALING
          </Text>
          <Text style={[t.textBase, t.mB4, { textAlign: "center" }]}>
            Hãy chọn Gói trải bài ưng ý!
          </Text>
        </View>

        {packages.map((pkg, index) => (
          <PackageCard
            key={index}
            title={pkg.title}
            price={pkg.price}
            description={pkg.description}
            imageURL={pkg.imageURL}
            onPress={() => handlePress(pkg.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
