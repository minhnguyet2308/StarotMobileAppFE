import HeaderReader from "@/components/HeaderReader";
import HistoryInfo from "@/components/HistoryInfo";
import React from "react";
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const mockHistoryData = [
  {
    id: 1,
    date: "Thứ 7 - 05/10/2024",
    packageName: "Gói trải bài tổng quan tuần",
    customerName: "Phương Khanh",
    status: "Hoàn thành",
    rating: 4,
    review:
      "Mình rất hài lòng về dịch vụ xem Tarot trực tuyến. Reader còn tận tâm và trải bài cho mình rất kĩ. Những thông điệp cực kì đúng với mình luôn. Mình cũng sẽ trải nghiệm thêm các gói trải bài khác nữa!",
    image: require("@/assets/images/booking.png"),
  },
  {
    id: 2,
    date: "Thứ 6 - 04/10/2024",
    packageName: "Gói trải bài tình yêu",
    customerName: "Ngọc Thảo",
    status: "Đang chờ",
    rating: 5,
    review:
      "Một trải nghiệm tuyệt vời! Reader rất thấu hiểu và phân tích chi tiết vấn đề của mình. Chắc chắn sẽ quay lại!",
    image: require("@/assets/images/booking.png"),
  },
  {
    id: 3,
    date: "Thứ 5 - 03/10/2024",
    packageName: "Gói trải bài công việc",
    customerName: "Hoàng Minh",
    status: "Hoàn thành",
    rating: 3,
    review:
      "Dịch vụ tốt nhưng mình cảm thấy chưa thực sự đúng với hoàn cảnh của mình lắm. Tuy nhiên, cũng là một trải nghiệm thú vị.",
    image: require("@/assets/images/booking.png"),
  },
  {
    id: 4,
    date: "Thứ 4 - 02/10/2024",
    packageName: "Gói trải bài sự nghiệp",
    customerName: "Thanh Hằng",
    status: "Hoàn thành",
    rating: 5,
    review:
      "Trải bài rất chi tiết và đúng đắn. Reader đã giúp mình hiểu rõ hơn về con đường sự nghiệp phía trước. Rất đáng để thử!",
    image: require("@/assets/images/booking.png"),
  },
  {
    id: 5,
    date: "Thứ 3 - 01/10/2024",
    packageName: "Gói trải bài tổng quan tháng",
    customerName: "Quang Anh",
    status: "Đã hủy",
    rating: 0,
    review: "Đã hủy lịch do có việc đột xuất, sẽ đặt lại sau.",
    image: require("@/assets/images/booking.png"),
  },
];

const Statistical = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View className="mb-[72px]">
        <HeaderReader title="THỐNG KÊ" />
        <View className="flex-row justify-between items-center mx-4 mt-4 border-b border-primary">
          <Text className="text-primary font-bold">LỊCH SỬ HOẠT ĐỘNG</Text>
          <Text className="text-primary font-bold">Tháng 10</Text>
        </View>
        <FlatList
          data={mockHistoryData}
          renderItem={({ item }: { item: any }) => (
            <HistoryInfo
              date={item.date}
              packageName={item.packageName}
              customerName={item.customerName}
              status={item.status}
              rating={item.rating}
              review={item.review}
              image={item.image}
            />
          )}
          keyExtractor={(item: any) => item.id.toString()}
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
