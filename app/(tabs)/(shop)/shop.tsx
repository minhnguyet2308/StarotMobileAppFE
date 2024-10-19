import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { t } from "react-native-tailwindcss";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { Product } from "@/type/Product.type";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamShopList } from "@/type/navigation";
import { Heart } from "lucide-react-native";

interface ItemCardProps {
  id: string;
  name: string;
  price: number;
  code: string;
  content: string;
  description: string;
  image: string;
  purchaseCount: number;
  onPress: () => void;
}

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  name,
  price,
  code,
  content,
  description,
  image,
  purchaseCount,
  onPress,
}) => (
  <TouchableOpacity
    style={[t.bgWhite, t.mB4, t.p4, t.itemsCenter]}
    onPress={onPress}
  >
    <Image source={{ uri: image }} style={[t.w32, t.h32, t.mB2]} />
    <Text style={[t.textLg, t.fontBold, t.mB1, { color: "#3014BA" }]}>
      {name}
    </Text>
    <Text style={[t.textBase, t.fontBold, { color: "#3014BA" }]}>
      {formatPrice(price)} VND
    </Text>
  </TouchableOpacity>
);

type NavigationProps = StackNavigationProp<RootStackParamShopList>;

const ShopScreen: React.FC = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProps>();
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://exestarotapi20241007212754.azurewebsites.net/api/v1/products"
        );
        setItems(response.data.data);
      } catch (err) {
        setError("Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={[t.flex1, t.bgWhite]}>
        <ActivityIndicator size="large" color="#3014BA" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[t.flex1, t.bgWhite]}>
        <Text style={[t.textRed600, t.textCenter]}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[t.flex1, t.bgWhite]}>
      <ScrollView contentContainerStyle={[t.p4, t.itemsCenter]}>
        <View style={[t.flexRow, t.itemsEnd, t.wFull, t.mB4, t.justifyEnd]}>
          <TouchableOpacity onPress={() => console.log("Heart pressed")}
            style={[t.mR5]}>
                  <Heart size={24} color="#3014BA" />
                </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Bag pressed")}>
            <Icon name="shopping-bag" size={26} color="#3014BA" />
          </TouchableOpacity>
        </View>

        <View style={[t.wFull, t.mB4, t.itemsCenter]}>
          <Text
            style={[
              t.textPurple600,
              t.text2xl,
              t.fontBold,
              { color: "#3014BA" },
            ]}
          >
            CỬA HÀNG
          </Text>
        </View>

        <View style={[t.flexRow, t.flexWrap, t.justifyAround]}>
          {items.map((item, index) => (
            <ItemCard
              key={index}
              id={item.id}
              name={item.name}
              price={item.price}
              code={item.code}
              content={item.content}
              description={item.description}
              image={item.image}
              purchaseCount={item.purchaseCount}
              onPress={() =>
                navigation.navigate("ShopDetail", { name: item.name })
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopScreen;
