import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react-native";
import { t } from "react-native-tailwindcss";
import axios from "axios";
import { RootStackParamShopList } from "@/type/navigation";
import { RouteProp } from "@react-navigation/native";
import { Product } from "@/type/Product.type";
import Icon from "react-native-vector-icons/FontAwesome";

type ProductDetailRouteProp = RouteProp<RootStackParamShopList, "ShopDetail">;

export default function ProductDetail() {
  const navigation = useNavigation();
  const route = useRoute<ProductDetailRouteProp>();
  const { name } = route.params;

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://exestarotapi20241007212754.azurewebsites.net/api/v1/products?Name=${name}`
        );
        setProduct(response.data.data[0]);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [name]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const totalPrice = product ? product.price * quantity : 0; // Calculate total price

  if (loading) {
    return (
      <SafeAreaView
        style={[t.flex1, t.bgWhite, t.justifyCenter, t.itemsCenter]}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={[t.flex1, t.bgWhite, t.justifyCenter, t.itemsCenter]}
      >
        <Text style={[t.textRed600]}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[t.flex1, t.bgWhite]}>
      <ScrollView>
        <View style={[t.p4]}>
          <TouchableOpacity style={[t.mR2]} onPress={() => navigation.goBack()}>
            <Icon name="angle-left" size={40} color="#3014BA" />
          </TouchableOpacity>

          {product ? (
            <>
              <Image
                source={{ uri: product.image }}
                style={[t.w64, t.h64, t.mXAuto, t.mB4, t.rounded]}
                resizeMode="contain"
              />

              <View style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.mB2]}>
                <Text style={[t.text2xl, t.fontBold, { color: "#3014BA" }]}>
                  {product.name}
                </Text>
                <TouchableOpacity>
                  <Heart size={24} color="#3014BA" />
                </TouchableOpacity>
              </View>

              <Text style={[t.textXl, t.fontBold, t.mB4, { color: "#3014BA" }]}>
                {new Intl.NumberFormat("vi-VN").format(totalPrice)} VND
              </Text>

              <View style={[t.flexRow, t.itemsCenter, t.mB6]}>
                <TouchableOpacity
                  onPress={decrementQuantity}
                  style={[t.p2, { backgroundColor: "#3014BA" }, t.roundedL]}
                >
                  <Minus size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <View style={[t.pX4, t.pY2, t.bgGray200]}>
                  <Text style={[t.textLg]}>{quantity}</Text>
                </View>
                <TouchableOpacity
                  onPress={incrementQuantity}
                  style={[t.p2, { backgroundColor: "#3014BA" }, t.roundedR]}
                >
                  <Plus size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    t.mL4,
                    t.p2,
                    { backgroundColor: "#3014BA" },
                    t.rounded,
                  ]}
                >
                  <ShoppingCart size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              <View style={[t.borderB, t.borderGray300, t.pY2]}>
                <Text style={[t.mB2, { color: "#392C7A" }]}>
                  <Text style={[t.fontBold]}>{product.content}</Text>
                </Text>
              </View>
              <Text style={[t.mT4, t.fontBold, { color: "#392C7A" }]}>
                {product.description}
              </Text>

              <View
                style={{
                  height: 1,
                  marginBottom: 40,
                  marginTop: 40,
                  backgroundColor: "#392C7A",
                  marginVertical: 10,
                }}
              />

              <Text
                style={[
                  t.textLg,
                  t.fontBold,
                  t.mB2,
                  t.textIndigo600,
                  { color: "#3014BA" },
                ]}
              >
                THÔNG TIN CHI TIẾT
              </Text>
              <View style={[t.mB4]}>
                <View
                  style={[
                    t.flexRow,
                    t.justifyBetween,
                    t.borderB,
                    t.borderGray300,
                    t.pY2,
                  ]}
                >
                  <Text style={[t.fontBold, { color: "#392C7A" }]}>
                    Hình dạng
                  </Text>
                  <Text style={{ color: "#392C7A" }}>Lọ Thủy Tinh</Text>
                </View>
                <View
                  style={[
                    t.flexRow,
                    t.justifyBetween,
                    t.borderB,
                    t.borderGray300,
                    t.pY2,
                  ]}
                >
                  <Text style={[t.fontBold, { color: "#392C7A" }]}>
                    Chất liệu
                  </Text>
                  <Text style={{ color: "#392C7A" }}>Thủy Tinh</Text>
                </View>
                <View
                  style={[
                    t.flexRow,
                    t.justifyBetween,
                    t.borderB,
                    t.borderGray300,
                    t.pY2,
                  ]}
                >
                  <Text style={[t.fontBold, { color: "#392C7A" }]}>
                    Kích thước vật chứa
                  </Text>
                  <Text style={{ color: "#392C7A" }}>12x5 cm</Text>
                </View>
                <View
                  style={[
                    t.flexRow,
                    t.justifyBetween,
                    t.borderB,
                    t.borderGray300,
                    t.pY2,
                  ]}
                >
                  <Text style={[t.fontBold, { color: "#392C7A" }]}>
                    Khối lượng vật chứa
                  </Text>
                  <Text style={{ color: "#392C7A" }}>17 gram</Text>
                </View>
                <View style={[t.flexRow, t.justifyBetween, t.pY2]}>
                  <Text style={[t.fontBold, { color: "#392C7A" }]}>
                    Khối lượng đá
                  </Text>
                  <Text style={{ color: "#392C7A" }}>10 gram</Text>
                </View>

                <View
                  style={{
                    height: 1,
                    marginBottom: 40,
                    marginTop: 40,
                    backgroundColor: "#392C7A",
                    marginVertical: 10,
                  }}
                />

                <Text
                  style={[
                    t.textLg,
                    t.fontBold,
                    t.mB2,
                    t.textIndigo600,
                    { color: "#3014BA" },
                  ]}
                >
                  LỌ THANH TẨY LÀ GÌ
                </Text>
                <Text style={[{ color: "#392C7A", lineHeight: 24 }]}>
                  Lọ đá thanh tẩy thạch anh là một vật phẩm phong thủy độc đáo
                  mang trong mình nhiều ý nghĩa và công dụng quan trọng. Được
                  chế tác từ đá thạch anh tự nhiên, lọ đá này không chỉ là một
                  vật trang trí đẹp mắt mà còn có khả năng tạo ra một không gian
                  sống an lành và tích cực.
                </Text>
              </View>
            </>
          ) : (
            <Text>Product not found</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
