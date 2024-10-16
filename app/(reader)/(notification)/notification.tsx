import HeaderReader from "@/components/HeaderReader";
import NotiInfo from "@/components/NotiInfo";
import React from "react";
import { Platform, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Notification = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderReader title="THÔNG BÁO" />
      <ScrollView className="p-4">
        <NotiInfo />
        <NotiInfo />
        <NotiInfo />
        <NotiInfo />
        <NotiInfo />
        <NotiInfo />
      </ScrollView>
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

export default Notification;
