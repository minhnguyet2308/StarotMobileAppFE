import HeaderReader from "@/components/HeaderReader";
import NotiInfo from "@/components/NotiInfo";
import React from "react";
import {
  Platform,
  FlatList,
  StyleSheet,
  View,
  ImageSourcePropType,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NotificationItem = {
  id: number;
  customerName: string;
  message: string;
  time: string;
  image: ImageSourcePropType;
};

const mockNotiData: NotificationItem[] = [
  {
    id: 1,
    customerName: "Phương Khanh",
    message: "đã huỷ hẹn lịch xem Tarot.",
    time: "30 phút trước",
    image: require("@/assets/images/booking.png"),
  },
  {
    id: 2,
    customerName: "Ngọc Thảo",
    message: "đã đặt lịch xem Tarot thành công.",
    time: "1 giờ trước",
    image: require("@/assets/images/booking.png"),
  },
  {
    id: 3,
    customerName: "Hoàng Minh",
    message: "đã hoàn thành trải bài Tarot của bạn.",
    time: "2 giờ trước",
    image: require("@/assets/images/booking.png"),
  },
  {
    id: 4,
    customerName: "Thanh Hằng",
    message: "đã huỷ hẹn lịch xem Tarot.",
    time: "3 giờ trước",
    image: require("@/assets/images/booking.png"),
  },
  {
    id: 5,
    customerName: "Quang Anh",
    message: "đã đặt lịch xem Tarot.",
    time: "5 giờ trước",
    image: require("@/assets/images/booking.png"),
  },
];

const Notification: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View className="mb-[72px]">
        <HeaderReader title="THÔNG BÁO" />
        <View style={styles.content}>
          <FlatList
            data={mockNotiData}
            keyExtractor={(item: NotificationItem) => item.id.toString()}
            renderItem={({ item }: { item: NotificationItem }) => (
              <NotiInfo
                customerName={item.customerName}
                message={item.message}
                time={item.time}
                image={item.image}
              />
            )}
          />
        </View>
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
  content: {
    padding: 16,
  },
});

export default Notification;
