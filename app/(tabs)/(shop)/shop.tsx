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

interface Item {
  title: string;
  price: string;
  imageURL: string;
}

interface ItemCardProps {
  title: string;
  price: string;
  imageURL: string;
  onPress: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  title,
  price,
  imageURL,
  onPress,
}) => (
  <TouchableOpacity
    style={[t.bgWhite, t.mB4, t.p4, t.itemsCenter]}
    onPress={onPress}
  >
    <Image source={{ uri: imageURL }} style={[t.w32, t.h32, t.mB2]} />
    <Text style={[t.textLg, t.fontBold, t.mB1]}>{title}</Text>
    <Text style={[t.textBase]}>{price}</Text>
  </TouchableOpacity>
);

const ShopScreen: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://670a3386af1a3998baa35682.mockapi.io/starot/cuahangs"
        ); 
        setItems(response.data); 
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
          <TouchableOpacity
            onPress={() => console.log("Heart pressed")}
            style={[t.mR5]}
          >
            <Icon name="heart" size={25} color="#3014BA" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Bag pressed")}>
            <Icon name="shopping-bag" size={25} color="#3014BA" />
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
              title={item.title}
              price={item.price}
              imageURL={item.imageURL}
              onPress={() => console.log(`${item.title} selected`)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopScreen;
