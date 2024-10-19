import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

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
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
const formatDateToISO = (dateString: string): string => {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};
const convertToMarkedDates = (
  dates: string[]
): { [key: string]: { marked: boolean; selected: boolean } } => {
  const markedDates: { [key: string]: { marked: boolean; selected: boolean } } =
    {};

  dates.forEach((date, index) => {
    const formattedDate = formatDateToISO(date);
    markedDates[formattedDate] = {
      marked: true,
      selected: false,
    };
  });

  return markedDates;
};
const CustomCalendar = ({
  setSelectedDate,
  selectedDate,
  listScheduleMaker = [],
}: {
  setSelectedDate: (value: string) => void;
  selectedDate: string;
  listScheduleMaker?: string[];
}) => {
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({
    [formatDateToISO(selectedDate)]: { selected: true, marked: true },
  });

  const handleDayPress = (day: any) => {
    const tempList = convertToMarkedDates(listScheduleMaker);
    const formattedDate = formatDate(day.dateString);
    setSelectedDate(formattedDate);
    setMarkedDates({
      ...tempList,
      [day.dateString]: { selected: true, marked: true },
    });
  };
  useEffect(() => {
    if (
      listScheduleMaker.length > 0 &&
      !markedDates[formatDateToISO(listScheduleMaker[0])]
    ) {
      const tempList = convertToMarkedDates(listScheduleMaker);
      setMarkedDates({ ...markedDates, ...tempList });
    }
  }, [listScheduleMaker]);
  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates}
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
