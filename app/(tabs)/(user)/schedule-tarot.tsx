import CustomCalendar from "@/components/CustomCalendar";
import HeaderUser from "@/components/HeaderUser";
import UserBookingInfo from "@/components/UserBookingInfo";
import React, { useState } from "react";
import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
const ScheduleTarot = () => {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  return (
    <SafeAreaView style={styles.container}>
      <HeaderUser title="Xem lịch tarot" />
      <CustomCalendar
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />
      <View className="mx-4">
        <View className="my-4 border-t border-primary" />
        <UserBookingInfo />
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
export default ScheduleTarot;
