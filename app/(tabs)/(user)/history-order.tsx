import CustomCalendar from "@/components/CustomCalendar";
import HeaderUser from "@/components/HeaderUser";
import HistoryInfo from "@/components/HistoryInfo";
import UserHistoryInfo from "@/components/UserHistoryInfo";
import UserHistoryOrderInfo from "@/components/UserHistoryOrderInfo";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HistoryOrder = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderUser title="LỊCH SỬ MUA HÀNG" />
      <UserHistoryOrderInfo />
      <UserHistoryOrderInfo />
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
export default HistoryOrder;