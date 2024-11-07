import HeaderUser from "@/components/HeaderUser";
import { getUserInfo, getUserTransaction } from "@/service/authSevice";
import { transitonType, userProfileType } from "@/utils/datatype";
import { FontAwesome } from "@expo/vector-icons";
import { AxiosResponse } from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PaymentWwallet = () => {
  const [userInfo, setUserInfo] = useState<userProfileType>();
  const [userTransaction, setUserTransaction] = useState<transitonType[]>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfoResponse = await getUserInfo();
        setUserInfo(userInfoResponse.data);

        const userTransactionResponse =
          (await getUserTransaction()) as unknown as transitonType[];
        setUserTransaction(userTransactionResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderUser title="VÍ STAROT" />
      <View className="p-6">
        <View className="bg-primary rounded-md p-4">
          <Text className="text-white">Số dư ví</Text>
          <Text className="text-white text-2xl mt-2">
            {formatPrice(Number(userInfo?.balance))} VND
          </Text>
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
          <FlatList
            data={userTransaction}
            keyExtractor={(_: transitonType, index: number) => index.toString()}
            renderItem={({ item }: { item: transitonType }) => (
              <View className="p-2 border border-primary rounded-md mt-2">
                <View className="flex-row justify-between items-center">
                  <Text className="text-primary">{item.transactionDate}</Text>
                  <Text
                    className={
                      item.status === "Thành công"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {item.status}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-primary font-bold">{item.type}</Text>
                  <Text className="text-primary font-bold">
                    {formatPrice(Number(item.amount))} VND
                  </Text>
                </View>
              </View>
            )}
          />
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
