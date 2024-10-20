import HeaderUser from "@/components/HeaderUser";
import { router } from "expo-router";
import React from "react";
import {
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
  const handleDeposit = () => {
    Toast.show({
      type: "success",
      text1: "Thanh  toán thành công",
      text2: "Vui lòng kiểm tra ví",
    });
    router.push("/payment-wallet");
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
