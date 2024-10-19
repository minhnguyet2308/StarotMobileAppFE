import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { t } from "react-native-tailwindcss";
import { X, Heart, Minus, Plus } from "lucide-react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RootStackParamOrderConfirmationList,
  RootStackParamShopList,
} from "@/type/navigation";
import { useCart } from "@/context/CartContext";

type NavigationProps = StackNavigationProp<RootStackParamShopList>;
type NavigationProps2 =
  StackNavigationProp<RootStackParamOrderConfirmationList>;

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN").format(price);
};

const CartItemCard: React.FC<{
  item: any;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}> = ({ item, onIncrement, onDecrement, onRemove }) => (
  <View style={[t.flexRow, t.itemsCenter, t.justifyBetween, t.mB4, t.wFull]}>
    <Image source={{ uri: item.image }} style={[t.w16, t.h16, t.rounded]} />
    <View style={[t.flex1, t.mL4]}>
      <Text style={[t.textBase, t.fontBold, { color: "#3014BA" }]}>
        {item.name}
      </Text>
      <Text style={[t.textSm, { color: "#3014BA" }]}>
        {formatPrice(item.price)} VND
      </Text>
    </View>
    <View style={[t.flexRow, t.itemsCenter]}>
      <TouchableOpacity
        onPress={onDecrement}
        style={[t.p2, { backgroundColor: "#3014BA" }, t.roundedL]}
      >
        <Minus size={16} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={[t.pX4, t.pY2, t.bgGray200]}>
        <Text style={[t.textBase, { color: "#3014BA" }]}>{item.quantity}</Text>
      </View>
      <TouchableOpacity
        onPress={onIncrement}
        style={[t.p2, { backgroundColor: "#3014BA" }, t.roundedR]}
      >
        <Plus size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={onRemove} style={[t.mL4]}>
      <Text style={[t.textRed600]}>Remove</Text>
    </TouchableOpacity>
  </View>
);

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity } =
    useCart();
  const navigation = useNavigation<NavigationProps>();
  const navigation2 = useNavigation<NavigationProps2>();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <SafeAreaView style={[t.flex1, t.bgWhite]}>
      <View style={[t.flex1, t.p4]}>
        <View style={[t.flexRow, t.itemsEnd, t.wFull, t.mB4, t.justifyEnd]}>
          <TouchableOpacity
            onPress={() => console.log("Heart pressed")}
            style={[t.mR5]}
          >
            <Heart size={24} color="#3014BA" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Bag pressed")}>
            <Icon name="shopping-bag" size={26} color="#3014BA" />
          </TouchableOpacity>
        </View>

        <View style={[t.flexRow, t.itemsCenter, t.justifyBetween, t.mB4]}>
          <Text style={[t.text2xl, t.fontBold, { color: "#3014BA" }]}>
            GIỎ HÀNG
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <X size={24} color="#3014BA" />
          </TouchableOpacity>
        </View>

        <ScrollView style={[t.flex1, t.mB4]}>
          {cartItems.length === 0 ? (
            <Text style={[t.textCenter, t.textLg, { color: "#3014BA" }]}>
              Your cart is empty
            </Text>
          ) : (
            cartItems.map((item) => (
              <CartItemCard
                key={item.productID}
                item={item}
                onIncrement={() => incrementQuantity(item.productID)}
                onDecrement={() => decrementQuantity(item.productID)}
                onRemove={() => removeFromCart(item.productID)}
              />
            ))
          )}
        </ScrollView>

        {cartItems.length > 0 && (
          <View style={[t.pX4, t.pY4, t.bgGray100, t.roundedLg, t.shadowLg]}>
            <View style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.mB2]}>
              <Text style={[t.textXl, t.fontBold, { color: "#3014BA" }]}>
                TỔNG
              </Text>
              <Text style={[t.textXl, t.fontBold, { color: "#3014BA" }]}>
                {formatPrice(totalPrice)} VND
              </Text>
            </View>

            <TouchableOpacity
              style={[
                t.bgIndigo700,
                t.pY3,
                t.roundedFull,
                t.itemsCenter,
                t.shadowLg,
                t.mT2,
                { backgroundColor: "#3014BA" },
              ]}
              onPress={() =>
                navigation2.navigate("OrderConfirmation", { cartItems })
              }
            >
              <Text style={[t.textLg, t.fontBold, t.textWhite]}>
                THANH TOÁN
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Cart;
