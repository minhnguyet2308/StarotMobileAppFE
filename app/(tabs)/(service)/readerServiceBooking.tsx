import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { PackageQuestion } from "@/type/PackageQuestion.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamServiceConfirmation } from "@/type/navigation";
import { number } from "yup";

type NavigationProps = StackNavigationProp<RootStackParamServiceConfirmation>;

export default function ReaderServiceBooking() {
  const [selectedDate, setSelectedDate] = useState<number>(3);
  const navigation1 = useNavigation<NavigationProps>();
  const [packageQuestion, setPackageQuestion] =
    useState<PackageQuestion | null>(null);
  const navigation = useNavigation();
  const [selectedTimeRange, setSelectedTimeRange] = useState("23:00 - 24:00");

  const timeRanges = [
    ["18:00 - 19:00", "19:00 - 20:00", "20:00 - 21:00"],
    ["21:00 - 22:00", "22:00 - 23:00", "23:00 - 24:00"],
  ];

  const unavailableRanges = ["19:00 - 20:00"];

  const getDaysInMonth = () => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      days.push(i);
    }
    return days;
  };

  const eventDays = [
    3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 17, 18, 19, 21, 22, 23, 24, 25, 26,
    27, 29, 30,
  ];
  const offDays = getDaysInMonth().filter((day) => !eventDays.includes(day));

  useEffect(() => {
    const fetchPackageQuestion = async () => {
      try {
        const packageId = await AsyncStorage.getItem("selectedPackageId");
        const response = await fetch(
          `https://exestarotapi20241021202520.azurewebsites.net/api/v1/package-question/${packageId}`
        );
        const data = await response.json();

        if (data.status === 200) {
          setPackageQuestion(data.data);
        } else {
          console.error("Error fetching package data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching package data:", error);
      }
    };
    fetchPackageQuestion();
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const pressServiceConfirmation = () => {
    const today = new Date();
    const selectedDateObj = new Date(
      today.getFullYear(),
      today.getMonth(),
      selectedDate
    );

    if (selectedDateObj < today) {
      alert("StartDate must be at least one day in the future.");
      return;
    }

    const isTimeValid =
      selectedTimeRange &&
      selectedTimeRange.split(" - ").some((time) => {
        const [start, end] = time.split(":").map((t) => parseInt(t));
        return start >= 18 && end <= 23;
      });

    if (!isTimeValid) {
      alert("Selected time must be between 18:00 to 23:00.");
      return;
    }

    navigation1.navigate("ServiceConfirmation", {
      date: selectedDate,
      time: selectedTimeRange,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color="#4A21B7" size={24} />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={[styles.headerText, { color: "#4A21B7" }]}>
          TAROT HEALING
        </Text>
        <Text style={[styles.subHeaderText, { color: "#4A21B7" }]}>
          Hãy chọn thời gian mong muốn!
        </Text>
      </View>

      <View style={styles.calendarHeader}>
        <Text style={styles.monthText}>THÁNG 11</Text>
        <View style={styles.weekDays}>
          <Text style={styles.weekDay}>T2</Text>
          <Text style={styles.weekDay}>T3</Text>
          <Text style={styles.weekDay}>T4</Text>
          <Text style={styles.weekDay}>T5</Text>
          <Text style={styles.weekDay}>T6</Text>
          <Text style={styles.weekDay}>T7</Text>
          <Text style={styles.weekDay}>CN</Text>
        </View>
      </View>

      <ScrollView style={styles.calendar}>
        <View style={styles.daysGrid}>
          {[...Array(4)].map((_, index) => (
            <View key={`empty-${index}`} style={styles.emptyDay} />
          ))}
          {getDaysInMonth().map((day) => (
            <TouchableOpacity
              key={day}
              onPress={() => setSelectedDate(day)}
              style={[
                styles.dayContainer,
                selectedDate === day && styles.selectedDay,
              ]}
              disabled={offDays.includes(day)}
            >
              <Text
                style={[
                  styles.dayText,
                  selectedDate === day && styles.selectedDayText,
                ]}
              >
                {day}
              </Text>
              {eventDays.includes(day) && <View style={styles.eventDot} />}
              {offDays.includes(day) && <View style={styles.offDayDot} />}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.container1}>
        {timeRanges.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((timeRange) => (
              <TouchableOpacity
                key={timeRange}
                disabled={unavailableRanges.includes(timeRange)}
                onPress={() => setSelectedTimeRange(timeRange)}
                style={[
                  styles.timeSlot,
                  unavailableRanges.includes(timeRange) && styles.unavailable,
                  selectedTimeRange === timeRange && styles.selected,
                ]}
              >
                <Text
                  style={[
                    styles.timeText,
                    unavailableRanges.includes(timeRange) &&
                      styles.unavailableText,
                    selectedTimeRange === timeRange && styles.selectedText,
                  ]}
                >
                  {timeRange}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>{packageQuestion?.name}</Text>
          <Text style={styles.multiplier}>x1</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>TỔNG</Text>
          <Text style={styles.totalAmount}>
            {formatNumber(packageQuestion?.price ?? 0)} VND
          </Text>
        </View>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={pressServiceConfirmation}
        >
          <Text style={styles.paymentButtonText}>THANH TOÁN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 60,
  },
  backButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  subHeaderText: {
    textAlign: "center",
    fontSize: 15,
    color: "#fff",
    marginTop: 4,
  },
  packageInfo: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    marginTop: 16,
    borderRadius: 8,
  },
  packageName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  packageDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
  packagePrice: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
  calendarHeader: {
    padding: 16,
  },
  monthText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A21B7",
    marginBottom: 12,
    textAlign: "right",
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  weekDay: {
    fontFamily: "Bold",
    width: 40,
    fontSize: 18,
    textAlign: "center",
    color: "#4A21B7",
  },
  calendar: {
    flex: 1,
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
  },
  emptyDay: {
    width: "14.28%",
    height: 40,
  },
  dayContainer: {
    width: "14.28%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
  },
  selectedDay: {
    backgroundColor: "#4A21B7",
    borderRadius: 20,
  },
  dayText: {
    fontSize: 16,
  },
  selectedDayText: {
    color: "#fff",
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#4CAF50",
    position: "absolute",
    bottom: 4,
  },
  offDayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FF0000",
    position: "absolute",
    bottom: 4,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 15,
    color: "#4A21B7",
    fontFamily: "Bold",
  },
  multiplier: {
    fontSize: 12,
    color: "#4A21B7",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A21B7",
  },
  paymentButton: {
    backgroundColor: "#4A21B7",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  paymentButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  timeSlot: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "white",
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  unavailable: {
    backgroundColor: "#F3F4F6",
  },
  selected: {
    backgroundColor: "#3014BA",
  },
  timeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#111827",
  },
  unavailableText: {
    color: "#9CA3AF",
  },
  selectedText: {
    color: "white",
  },
  container1: {
    marginVertical: 16,
  },
});
