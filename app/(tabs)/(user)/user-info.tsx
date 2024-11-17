import DateInput from "@/components/DateInput";
import HeightSpacer from "@/components/HeightSpacer";
import ResuableText from "@/components/ResuableText";
import { useAuth } from "@/context/authContext";
import { getUserInfo } from "@/service/authSevice";
import { updateReaderInfo, updateUserInfo } from "@/service/userService";
import { formUpdateUserType, userProfileType } from "@/utils/datatype";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
const logo = require("@/assets/images/logo.png");
const parseDate = (dateString: string | null): Date | null => {
  if (!dateString) return null;
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};
const addOneDay = (date: string | Date) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate.toISOString();
};
const UserInfo = () => {
  const { logout, changeUserInfo, user } = useAuth();
  const [userData, setUserData] = useState<userProfileType | null>(null);
  const [formData, setFormData] = useState<formUpdateUserType>({
    Balance: 0,
    DateOfBirth: null,
    FirstName: "",
    LastName: "",
    Phone: "",
  });

  useEffect(() => {
    getUserInfo().then((data) => {
      setUserData(data.data);
      setFormData({
        DateOfBirth: data.data.dateOfBirth
          ? parseDate(data.data.dateOfBirth)
          : null,
        Balance: data.data.balance ? data.data.balance : null,
        FirstName: data.data.firstName ? data.data.firstName : null,
        LastName: data.data.lastName ? data.data.lastName : null,
        Phone: data.data.phone ? data.data.phone : null,
      });
    });
  }, []);
  const handleInputChange = (
    name: keyof formUpdateUserType,
    value: string | Date | null
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    let res: any;
    if (user?.role === "Customer") {
      res = await updateUserInfo({
        ...formData,
        DateOfBirth: formData.DateOfBirth
          ? addOneDay(formData.DateOfBirth)
          : null,
      });
    } else {
      res = await updateReaderInfo({
        ...formData,
        DateOfBirth: formData.DateOfBirth
          ? addOneDay(formData.DateOfBirth)
          : null,
      });
    }
    if (res.status === 200) {
      Toast.show({
        type: "success",
        text1: "Cập nhật thông tin thành công",
      });
      changeUserInfo({
        email: userData?.email || "",
        name: `${formData.FirstName} ${formData.LastName}`,
        role: user?.role || "Customer",
        sub: user?.sub || "",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Cập nhật thông tin thất bại",
      });
    }
  };
  return (
    <View className="p-4">
      <View className="mt-10 px-2 py-8 flex-row justify-between items-center">
        <Image
          source={logo}
          resizeMode="contain"
          className="h-10 border-none"
        />
        <TouchableOpacity onPress={() => logout()}>
          <MaterialIcons name="logout" size={30} color="#3014BA" />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center">
        <MaterialIcons
          name="keyboard-arrow-left"
          size={40}
          color="#3014BA"
          onPress={() => router.push("/")}
        />
        <ResuableText
          text="Thông tin cá nhân"
          fontFamily="SpaceMono"
          size={24}
          fontWeight="700"
          textAlign="start"
        />
        <View />
      </View>
      <HeightSpacer height={20} />
      <View>
        <View className="flex-row justify-between items-center gap-4">
          <View className="w-1/2">
            <ResuableText
              text="Họ"
              fontFamily="SpaceMono"
              size={16}
              fontWeight="700"
              textAlign="start"
            />
            <TextInput
              className="border border-second rounded-md px-2 py-1"
              value={formData.FirstName}
              onChangeText={(text) => handleInputChange("FirstName", text)}
            />
          </View>

          <View className="flex-1">
            <ResuableText
              text="Tên"
              fontFamily="SpaceMono"
              size={16}
              fontWeight="700"
              textAlign="start"
            />
            <TextInput
              className="border border-second rounded-md px-2 py-1"
              value={formData.LastName}
              onChangeText={(text) => handleInputChange("LastName", text)}
            />
          </View>
        </View>

        <HeightSpacer height={16} />

        <View className="w-full">
          <DateInput
            value={formData.DateOfBirth ? new Date(formData.DateOfBirth) : null}
            onChange={(newDate) => handleInputChange("DateOfBirth", newDate)}
          />
        </View>

        <HeightSpacer height={16} />

        <View className="w-full">
          <ResuableText
            text="Số điện thoại"
            fontFamily="SpaceMono"
            size={16}
            fontWeight="700"
            textAlign="start"
          />
          <TextInput
            className="border border-second rounded-md px-2 py-1"
            value={formData.Phone}
            onChangeText={(text) => handleInputChange("Phone", text)}
          />
        </View>

        <HeightSpacer height={16} />

        <View className="w-full">
          <ResuableText
            text="Email"
            fontFamily="SpaceMono"
            size={16}
            fontWeight="700"
            textAlign="start"
          />
          <TextInput
            className="border border-second rounded-md px-2 py-1 bg-gray-200 text-gray-600"
            value={userData?.email}
            editable={false}
          />
        </View>

        <HeightSpacer height={16} />

        <TouchableOpacity
          className="justify-center items-center bg-second text-primary p-2 rounded-md"
          onPress={handleSubmit}
        >
          <ResuableText
            text="Lưu thay đổi"
            fontFamily="SpaceMono"
            size={16}
            fontWeight="700"
            textAlign="start"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserInfo;
