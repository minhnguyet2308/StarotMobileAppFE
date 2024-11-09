import BookingInfo from "@/components/BookingInfo";
import CustomCalendar from "@/components/CustomCalendar";
import HeaderReader from "@/components/HeaderReader";
import { getBooking } from "@/service/bookingSevice";
import { scheduleType } from "@/utils/datatype";
import React, { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Schedule = () => {
  const [listSchedule, setListSchedule] = useState<scheduleType[]>([]);
  const [listScheduleMaker, setListScheduleMaker] = useState<string[]>([]);

  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  useEffect(() => {
    getBooking({ Date: selectedDate }).then((data) =>
      setListSchedule(data.data)
    );
    getBooking().then((data) => {
      if (data?.data?.length) {
        console.log("data", data.data);
        const getDateList = data.data.map(
          (schedule: scheduleType) => schedule.date
        );
        setListScheduleMaker(getDateList);
      }
    });
  }, [selectedDate]);
  const renderItem = ({ item }: { item: scheduleType }) => (
    <BookingInfo schedule={item} key={item.id} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <HeaderReader />
      <CustomCalendar
        listScheduleMaker={listScheduleMaker}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />
      <View style={styles.container}>
        <FlatList
          data={listSchedule}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id.toString()}
          ListEmptyComponent={
            <Text className="text-center text-primary font-bold text-2xl">
              Không tìm thấy lịch phù hợp
            </Text>
          }
          contentContainerStyle={styles.listContainer}
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
  listContainer: {
    paddingVertical: 8,
  },
});

export default Schedule;
