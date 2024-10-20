import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import HeaderUser from "@/components/HeaderUser";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

const PaymentWwallet = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderUser title="VÍ STAROT" />
      <View className="p-6">
        <View className="bg-primary rounded-md p-4">
          <Text className="text-white">Số dư ví</Text>
          <Text className="text-white text-2xl mt-2">20.000 VND</Text>
          <View className="absolute top-1 right-1 bg-white rounded-full p-1">
            <FontAwesome name="money" size={24} color="black" />
          </View>
        </View>
        <View className="flex-row gap-2 my-4 items-center">
          <TouchableOpacity
            onPress={() => router.push("/deposit")}
            className="flex-1 border border-primary rounded-md items-center py-1"
          >
            <Text className="items-center text-primary font-semibold">
              Nạp tiền
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 border border-primary rounded-md items-center py-1">
            <Text className="items-center text-primary font-semibold">
              Rút tiền
            </Text>
          </TouchableOpacity>
        </View>
        <View className="border-t border-t-primary" />
        <View className="mt-4">
          <Text className="font-semibold text-primary text-lg">
            LỊCH SỬ GIAO DỊCH
          </Text>
          <View className="p-2 border border-primary rounded-md gap-2 mt-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-primary">05/10/2024</Text>
              <Text className="text-green-600">Thành công</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-primary font-bold">Nạp tiền</Text>
              <Text className="text-primary font-bold">135.00 VND</Text>
            </View>
          </View>
          <View className="p-2 border border-primary rounded-md gap-2 mt-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-primary">05/10/2024</Text>
              <Text className="text-green-600">Thành công</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-primary font-bold">Nạp tiền</Text>
              <Text className="text-primary font-bold">20.000 VND</Text>
            </View>
          </View>
          <View className="p-2 border border-primary rounded-md gap-2 mt-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-primary">05/10/2024</Text>
              <Text className="text-green-600">Thành công</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-primary font-bold">Nạp tiền</Text>
              <Text className="text-primary font-bold">50.000 VND</Text>
            </View>
          </View>
          <View className="p-2 border border-primary rounded-md gap-2 mt-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-primary">05/10/2024</Text>
              <Text className="text-green-600">Thành công</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-primary font-bold">Nạp tiền</Text>
              <Text className="text-primary font-bold">100.000 VND</Text>
            </View>
          </View>
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
export default PaymentWwallet;
