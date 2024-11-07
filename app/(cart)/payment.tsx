import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styled } from "nativewind";
import { ChevronLeft } from "lucide-react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamPaymentResult } from "@/type/navigation";

type PaymentRouteProp = RouteProp<
  { Payment: { finalPrice: number; cartItems: any[] } },
  "Payment"
>;

type NavigationProps = StackNavigationProp<RootStackParamPaymentResult>;

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function PaymentScreen() {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<PaymentRouteProp>();
  const { cartItems } = route.params;
  const { finalPrice } = route.params;
  const paymentInfo = {
    amount: "175,000 VND",
    bankName: "Ngân hàng Thương mại Cổ phần Tiên Phong",
    accountHolder: "TRAN THI NGOC VY",
    accountNumber: "0000 1234 5678",
    description: "DV1 - [số điện thoại]",
  };

  const imageUri =
    "https://firebasestorage.googleapis.com/v0/b/starot-aa9da.appspot.com/o/Mobile%2FQR%20CODE%20BANK%201.png?alt=media&token=fda3d224-981d-4548-8e69-64d13c420b6fhttps://example.com/your-image.png"; // Provide the image URL or local path

  const navigation1 = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("PaymentResult", {
        cartItems: cartItems,
      });
    }, 15000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <StyledView className="flex-1 bg-white">
      {/* Header */}
      <StyledView className="bg-indigo-700 pt-12 pb-4 px-4">
        <StyledView className="flex-row items-center">
          <StyledTouchableOpacity onPress={() => navigation1.goBack()}>
            <ChevronLeft size={24} color="white" />
          </StyledTouchableOpacity>
          <StyledText className="text-white text-lg font-medium ml-4">
            THANH TOÁN
          </StyledText>
        </StyledView>
      </StyledView>

      <StyledView className="p-6 items-center">
        <StyledText className="text-indigo-700 text-lg font-medium mb-4">
          Tổng: {formatNumber(finalPrice)} VND
        </StyledText>

        <StyledView className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <Image
            source={{ uri: imageUri }}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
        </StyledView>

        <StyledView className="w-full">
          <StyledText className="text-indigo-700 font-medium mb-4">
            THÔNG TIN CHUYỂN KHOẢN
          </StyledText>

          <StyledView className="space-y-4">
            <StyledView>
              <StyledText className="text-gray-600 mb-1">Ngân hàng</StyledText>
              <StyledText className="text-black">
                {paymentInfo.bankName}
              </StyledText>
            </StyledView>

            <StyledView>
              <StyledText className="text-gray-600 mb-1">
                Chủ tài khoản
              </StyledText>
              <StyledText className="text-black">
                {paymentInfo.accountHolder}
              </StyledText>
            </StyledView>

            <StyledView>
              <StyledText className="text-gray-600 mb-1">
                Số tài khoản
              </StyledText>
              <StyledText className="text-black">
                {paymentInfo.accountNumber}
              </StyledText>
            </StyledView>

            <StyledView>
              <StyledText className="text-gray-600 mb-1">
                Nội dung chuyển khoản
              </StyledText>
              <StyledText className="text-black">
                {paymentInfo.description}
              </StyledText>
            </StyledView>
          </StyledView>
        </StyledView>

        <StyledText className="text-indigo-700 text-sm mt-6 text-center">
          *Lưu ý: Nhập chính xác số tiền, nội dung{"\n"}khi chuyển khoản.
        </StyledText>
      </StyledView>
    </StyledView>
  );
}
