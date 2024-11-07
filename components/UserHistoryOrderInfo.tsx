import { orderType, productOrderType } from "@/utils/datatype";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View, FlatList } from "react-native";

const orderIcon = require("@/assets/images/order.png");

const UserHistoryOrderInfo = ({ item }: { item: orderType }) => {
  const totalAmount = item.products.reduce(
    (total, product) => total + product.unitPrice * product.amount,
    0
  );
  const handleDetailOrder = async () => {
    await AsyncStorage.setItem("orderDetailLocal", JSON.stringify(item));
    router.push("/(user)/history-order-detail");
  };
  return (
    <View className="bg-white p-4 rounded-lg border-b">
      <View className="flex-row justify-between">
        <View>
          <Image
            source={
              item.products?.length
                ? { uri: item.products[0].image }
                : orderIcon
            }
            className="w-16 h-24"
          />
          <Text className="text-base text-primary">Sản phẩm</Text>
        </View>
        <View className="mt-2 gap-2">
          <View className="flex-row justify-between mt-2">
            <Text className="text-xs text-primary">{item.orderDate}</Text>
            <Text className="text-xs text-primary">{item.status}</Text>
          </View>
          <FlatList
            data={item.products}
            keyExtractor={(product: { productID: any }) => product.productID}
            renderItem={({ item: product }: { item: productOrderType }) => (
              <View className="flex-row justify-between items-center border-b border-primary mt-2">
                <Text className="text-lg text-[#392C7A] font-bold">
                  {product.name} ×{product.amount}
                </Text>
                <Text className="text-lg text-[#392C7A]">
                  {product.unitPrice * product.amount} VND
                </Text>
              </View>
            )}
          />

          <Text className="text-xl font-bold mt-2 text-primary">
            Thành tiền: {totalAmount.toLocaleString("vi-VN")} VND
          </Text>

          <TouchableOpacity
            onPress={handleDetailOrder}
            className="bg-primary py-2 px-4 rounded"
          >
            <Text className="text-white text-center">Xem chi tiết</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-red-500 py-2 px-4 rounded mt-2">
            <Text className="text-white text-center">Huỷ đơn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserHistoryOrderInfo;
