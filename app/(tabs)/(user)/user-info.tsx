import HeightSpacer from "@/components/HeightSpacer";
import ResuableText from "@/components/ResuableText";
import { useAuth } from "@/context/authContext";
import { getUserInfo } from "@/service/authSevice";
import { userProfileType } from "@/utils/datatype";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
const logo = require("@/assets/images/logo.png");

const UserInfo = () => {
  const { logout } = useAuth();
  const [userData, setUserData] = useState<userProfileType | null>(null);
  const [formData, setFormData] = useState<userProfileType>({
    balance: 0,
    dateOfBirth: null,
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  useEffect(() => {
    getUserInfo().then((data) => {
      setUserData(data.data);
      setFormData({
        ...data.data,
        dateOfBirth: data.data.dateOfBirth ? data.data.dateOfBirth : null,
      });
    });
  }, []);
  const handleInputChange = (
    name: keyof userProfileType,
    value: string | Date | null
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    console.log("Form Data Submitted: ", formData);
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
              value={formData.firstName}
              onChangeText={(text) => handleInputChange("firstName", text)}
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
              value={formData.lastName}
              onChangeText={(text) => handleInputChange("lastName", text)}
            />
          </View>
        </View>

        <HeightSpacer height={16} />

        <View className="w-full">
          <ResuableText
            text="Ngày sinh"
            fontFamily="SpaceMono"
            size={16}
            fontWeight="700"
            textAlign="start"
          />
          <TextInput
            className="border border-second rounded-md px-2 py-1"
            value={formData.dateOfBirth || ""}
            onChangeText={(text) =>
              handleInputChange("dateOfBirth", new Date(text))
            }
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
            value={formData.phone}
            onChangeText={(text) => handleInputChange("phone", text)}
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
            className="border border-second rounded-md px-2 py-1"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
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
