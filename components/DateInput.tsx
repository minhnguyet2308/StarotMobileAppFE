import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Platform } from "react-native";
import ResuableText from "@/components/ResuableText";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateInput = ({
  value,
  onChange,
}: {
  value: Date | null;
  onChange: (val: Date) => void;
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View className="w-full">
      <ResuableText
        text="Ngày sinh"
        fontFamily="SpaceMono"
        size={16}
        fontWeight="700"
        textAlign="start"
      />
      <TouchableOpacity
        className="border border-second rounded-md px-2 py-1"
        onPress={() => setShowPicker(true)}
      >
        <TextInput
          value={formatDate(value)}
          editable={false}
          placeholder="Chọn ngày sinh"
        />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default DateInput;
