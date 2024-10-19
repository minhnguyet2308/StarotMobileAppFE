import React from "react";
import { Platform, StyleSheet, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderUser from "@/components/HeaderUser";
import UserHistoryInfo from "@/components/UserHistoryInfo";

const booking = require("@/assets/images/booking.png");

const mockHistoryData = [
  {
    id: 1,
    date: "Thứ 7 - 05/10/2024",
    status: "Hoàn thành",
    packageName: "Gói trải bài tổng quan tuần",
    readerName: "Julee",
    time: "19:00 - 20:00",
    price: "150.000 VND",
    image: booking,
  },
  {
    id: 2,
    date: "Chủ Nhật - 06/10/2024",
    status: "Đã hủy",
    packageName: "Gói trải bài về tình yêu",
    readerName: "Mai Anh",
    time: "20:00 - 21:00",
    price: "200.000 VND",
    image: booking,
  },
];

const HistoryBooking = () => {
  const renderItem = ({ item }: any) => (
    <View className="bg-primary py-2">
      <UserHistoryInfo
        date={item.date}
        status={item.status}
        packageName={item.packageName}
        readerName={item.readerName}
        time={item.time}
        price={item.price}
        image={item.image}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderUser title="LỊCH SỬ ĐẶT LỊCH" />
      <FlatList
        data={mockHistoryData}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id.toString()}
      />
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

export default HistoryBooking;
