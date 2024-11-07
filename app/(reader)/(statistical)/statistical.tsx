import HeaderReader from "@/components/HeaderReader";
import HistoryInfo from "@/components/HistoryInfo";
import { useAuth } from "@/context/authContext";
import { getFeedback } from "@/service/feedbackSevice";
import React, { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
interface bookingType {
  comment: string;
  customerId: string;
  customerImage: string;
  customerName: string;
  date: string;
  rating: number;
}
const Statistical = () => {
  const { user } = useAuth();
  const [listFeedBack, setListFeedBack] = useState<bookingType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getFeedback(user?.sub || "");
      if (res?.data?.length) {
        setListFeedBack(res.data);
      }
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View className="mb-[72px]">
        <HeaderReader title="THỐNG KÊ" />
        <View className="flex-row justify-between items-center mx-4 mt-4 border-b border-primary">
          <Text className="text-primary font-bold">LỊCH SỬ HOẠT ĐỘNG</Text>
          <Text className="text-primary font-bold">Tháng 10</Text>
        </View>
        <FlatList
          data={listFeedBack}
          renderItem={({ item }: { item: bookingType }) => (
            <HistoryInfo
              date={item.date}
              packageName={"goi trai nghiem"}
              customerName={item.customerName}
              status={"hoan thanh"}
              rating={item.rating}
              review={item.comment}
              image={item.customerImage}
            />
          )}
          keyExtractor={(_: bookingType, index: number) => index.toString()}
        />
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

export default Statistical;
