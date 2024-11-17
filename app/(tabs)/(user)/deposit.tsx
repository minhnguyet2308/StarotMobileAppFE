import HeaderUser from "@/components/HeaderUser";
import { payOs } from "@/service/userService";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const Deposit = () => {
  const [amount, setAmount] = useState("");

  const handleDeposit = async () => {
    try {
      const res = await payOs({ amount: Number(amount) });
      if (res.status === 200) {
        if (res.data.url) {
          Linking.openURL(res.data.url);
          router.push("/payment-wallet");
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Nạp tiền thất bại",
          text2: "Vui lòng thử lại",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Nạp tiền thất bại",
        text2: "Vui lòng thử lại",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderUser title="NẠP TIỀN" />
      <View className="p-6">
        <Text className="text-primary font-bold text-lg my-2">
          Nhập số tiền cần nạp{" "}
        </Text>
        <View className="bg-primary rounded-md p-4 flex-row items-center justify-between">
          <TextInput
            className="flex-1 text-white text-xl placeholder:text-base"
            placeholder="Nhập số tiền"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <Text className="text-white font-bold text-lg">VND</Text>
        </View>
        <View className="flex-row gap-2 my-4 items-center">
          <TouchableOpacity
            onPress={handleDeposit}
            className="flex-1 border border-primary rounded-md items-center py-1"
          >
            <Text className="items-center text-primary font-semibold py-2">
              Nạp tiền
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});

export default Deposit;
