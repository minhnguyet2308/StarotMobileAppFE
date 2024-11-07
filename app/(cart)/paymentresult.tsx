import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { User } from "@/type/User.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RootStackParamCartList,
  RootStackParamPayment,
  RootStackParamShopList,
} from "@/type/navigation";

type PaymentResultRouteProp = RouteProp<
  { PaymentResult: { cartItems: any[] } },
  "PaymentResult"
>;

type NavigationProps = StackNavigationProp<RootStackParamCartList>;

export default function PaymentResultScreen() {
  const [selectedPayment, setSelectedPayment] = useState("Ví Starot");
  const navigation = useNavigation<NavigationProps>();
  const [discountCode, setDiscountCode] = useState("");
  const route = useRoute<PaymentResultRouteProp>();
  const { cartItems } = route.params;
  const [user, setUser] = useState<User>();
  const [finalPrice, setFinalPrice] = useState(0);
  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const today = new Date();

  const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
    today.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${today.getFullYear()}`;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        const response = await axios.get(
          "https://exestarotapi20241021202520.azurewebsites.net/api/v1/user/info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.data);
      } else {
        console.log("No token found.");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const calculatedFinalPrice = subtotal - 30000;
    setFinalPrice(calculatedFinalPrice);
  }, [subtotal]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ padding: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <ArrowLeft size={24} color="#3014BA" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 16,
                color: "#3014BA",
                flex: 1,
                textAlign: "center",
              }}
            >
              ĐẶT HÀNG THÀNH CÔNG
            </Text>
          </View>

          <View
            style={{
              marginBottom: 16,
              padding: 50,
              backgroundColor: "#3014BA",
            }}
          >
            <Text style={{ color: "#FFFFFF" }}>
              Starot xin cảm ơn quý khách đã tin tưởng sử dụng dịch vụ của chúng
              tôi!
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#3014BA" }}>
              ORD-20241022-4EDC
            </Text>
            <Text style={{ color: "#3014BA" }}>{formattedDate}</Text>
          </View>

          <View
            style={{
              height: 1,
              marginBottom: 30,
              marginTop: 0,
              backgroundColor: "#392C7A",
              marginVertical: 10,
            }}
          />

          <View style={{ marginBottom: 16 }}>
            <Text
              style={{ fontWeight: "bold", marginBottom: 16, color: "#3014BA" }}
            >
              THÔNG TIN VẬN CHUYỂN
            </Text>
            <Text style={{ marginBottom: 4, color: "#3014BA" }}>
              <Text style={{ fontWeight: "bold" }}>Người nhận: </Text>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={{ marginBottom: 4, color: "#3014BA" }}>
              <Text style={{ fontWeight: "bold" }}>Số điện thoại: </Text>
              {user?.phone}
            </Text>
            <Text style={{ color: "#3014BA" }}>
              <Text style={{ fontWeight: "bold" }}>Địa chỉ: </Text>
              Lô E2a-7, Đường D1, D. Đ1, Long Thạnh Mỹ,{"\n"}
              Thành Phố Thủ Đức, Hồ Chí Minh 700000,{"\n"}
              Việt Nam.
            </Text>
          </View>

          <View
            style={{
              height: 1,
              marginBottom: 40,
              marginTop: 0,
              backgroundColor: "#392C7A",
              marginVertical: 10,
            }}
          />

          <View style={{ marginBottom: 16 }}>
            <Text
              style={{ fontWeight: "bold", marginBottom: 8, color: "#3014BA" }}
            >
              THÔNG TIN ĐƠN HÀNG
            </Text>
            {cartItems.map((item) => (
              <View
                key={item.productID}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 16,
                  borderBottomWidth: 1,
                  borderColor: "#D1D1D1",
                  paddingBottom: 8,
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 50,
                    height: 50,
                    marginRight: 16,
                    borderRadius: 8,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "#3014BA", fontWeight: "bold" }}>
                    {item.name}
                  </Text>
                  <Text style={{ marginBottom: 8, color: "#3014BA" }}>
                    Số lượng: {item.quantity}
                  </Text>
                </View>
                <Text style={{ color: "#3014BA", fontWeight: "bold" }}>
                  {formatNumber(item.price * item.quantity)} VND
                </Text>
              </View>
            ))}
          </View>

          <View
            style={{
              marginBottom: 16,
              padding: 20,
              backgroundColor: "#3014BA",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>Tạm tính</Text>
              <Text style={{ color: "#FFFFFF" }}>
                {formatNumber(subtotal)} VND
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>Phí vận chuyển</Text>
              <Text style={{ color: "#FFFFFF" }}>30.000 VND</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>Ưu đãi</Text>
              <Text style={{ color: "#FFFFFF" }}>0 VND</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                Thành tiền
              </Text>
              <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                {formatNumber(finalPrice)} VND
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
