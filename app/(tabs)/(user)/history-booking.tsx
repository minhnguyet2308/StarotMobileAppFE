import CustomCalendar from "@/components/CustomCalendar";
import HeaderUser from "@/components/HeaderUser";
import HistoryInfo from "@/components/HistoryInfo";
import UserHistoryInfo from "@/components/UserHistoryInfo";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HistoryBooking = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderUser title="LỊCH SỬ ĐẶT LỊCH" />
      <View className="bg-primary py-2 pt-4">
        <UserHistoryInfo />
      </View>
      <View className="bg-primary py-2">
        <UserHistoryInfo />
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
export default HistoryBooking;
