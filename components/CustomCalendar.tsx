import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

// Cấu hình locale cho tiếng Việt
LocaleConfig.locales["vi"] = {
  monthNames: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  monthNamesShort: [
    "Thg1",
    "Thg2",
    "Thg3",
    "Thg4",
    "Thg5",
    "Thg6",
    "Thg7",
    "Thg8",
    "Thg9",
    "Thg10",
    "Thg11",
    "Thg12",
  ],
  dayNames: [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ],
  dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  today: "Hôm nay",
};
LocaleConfig.defaultLocale = "vi";

const CustomCalendar = ({
  setSelectedDate,
  selectedDate,
}: {
  setSelectedDate: (value: string) => void;
  selectedDate: string;
}) => {
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({
    [selectedDate]: { selected: true, marked: true },
  });

  // Hàm định dạng ngày thành "dd/MM/yyyy"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleDayPress = (day: any) => {
    const formattedDate = formatDate(day.dateString); // Định dạng ngày thành "dd/MM/yyyy"
    setSelectedDate(formattedDate); // Cập nhật selectedDate với định dạng mới

    // Cập nhật trạng thái đánh dấu các ngày
    setMarkedDates({
      [day.dateString]: { selected: true, marked: true }, // Đánh dấu ngày đã chọn
    });
  };

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates} // Sử dụng trạng thái markedDates đã cập nhật
        onDayPress={handleDayPress}
        theme={{
          selectedDayBackgroundColor: "#3014BA",
          todayTextColor: "#3014BA",
          dayTextColor: "#3014BA",
          textDisabledColor: "#d9e1e8",
          dotColor: "#3014BA",
          selectedDotColor: "#ffffff",
          arrowColor: "#3014BA",
          monthTextColor: "#3014BA",
        }}
        style={styles.calendar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  calendar: {
    width: 350,
  },
});

export default CustomCalendar;
