import HeaderReader from "@/components/HeaderReader";
import HistoryInfo from "@/components/HistoryInfo";
import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Statistical = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <HeaderReader title="THỐNG KÊ" />
        <View className="flex-row justify-between items-center mx-4 mt-4 border-b border-primary">
          <Text className="text-primary font-bold">LỊCH SỬ HOẠT ĐỘNG</Text>
          <Text className="text-primary font-bold">Tháng 10</Text>
        </View>
        <HistoryInfo />
        <HistoryInfo />
        <HistoryInfo />
        <HistoryInfo />
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

export default Statistical;
