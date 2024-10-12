import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { t } from "react-native-tailwindcss";
import axios from "axios";

interface PackageCardProps {
  title: string;
  description: string;
  price: string;
  imageURL: string;
  onPress: () => void;
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

export default function TarotHealingScreen() {
  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          "https://670a3386af1a3998baa35682.mockapi.io/starot/dichvus"
        );
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

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
            onPress={() => console.log(`${pkg.title} selected`)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
