import BookingInfo from "@/components/BookingInfo";
import CustomCalendar from "@/components/CustomCalendar";
import HeaderReader from "@/components/HeaderReader";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Schedule = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderReader />
      <CustomCalendar />
      <View className="mx-4">
        <View className="my-4 border-t border-primary" />
        <BookingInfo />
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

export default Schedule;
