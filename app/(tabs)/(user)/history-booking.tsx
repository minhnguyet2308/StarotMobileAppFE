import HeaderUser from "@/components/HeaderUser";
import UserHistoryInfo from "@/components/UserHistoryInfo";
import { useAuth } from "@/context/authContext";
import { getBooking } from "@/service/bookingSevice";
import { ResponseTypeOJPagi, scheduleType } from "@/utils/datatype";
import React, { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const booking = require("@/assets/images/booking.png");

const HistoryBooking = () => {
  const { user } = useAuth();
  const [histories, setHistories] = useState<scheduleType[]>([]);
  const fetchHistory = async () => {
    const res = (await getBooking({
      CustomerId: user?.sub,
    })) as unknown as ResponseTypeOJPagi<scheduleType[]>;
    if (res.data?.length) {
      setHistories(res.data);
    }
  };
  useEffect(() => {
    fetchHistory();
  }, []);
  const renderItem = ({ item }: { item: scheduleType }) => (
    <View className="bg-primary py-2">
      <UserHistoryInfo
        date={item.date}
        status={item.status}
        packageName={item.packageName}
        readerName={item.readerName}
        time={item.date}
        price={String(item.price)}
        image={item.packageImage}
        readerImage={item.readerImage || ""}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderUser title="LỊCH SỬ ĐẶT LỊCH" />
      <FlatList
        data={histories}
        renderItem={renderItem}
        keyExtractor={(item: scheduleType) => item.id.toString()}
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
