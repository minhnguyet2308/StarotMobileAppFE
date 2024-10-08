import ResuableText from "@/components/ResuableText";
import {
  EXPO_CLIENT_ID,
  EXPO_REFIRECT_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_ID_FOR_ANDROID,
  GOOGLE_CLIENT_ID_FOR_IOS,
} from "@/constants/google";
import { FONTFAMILY, FONTSIZE, SPACING } from "@/utils/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";

WebBrowser.maybeCompleteAuthSession();

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Bắt buộc"),
  email: Yup.string()
    .email("Vui lòng cung cấp một email hợp lệ")
    .required("Bắt buộc"),
});

const SigninScreen: React.FC = () => {
  const [obsecureText, setObsecureText] = useState<boolean>(true);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    androidClientId: GOOGLE_CLIENT_ID_FOR_ANDROID,
    iosClientId: GOOGLE_CLIENT_ID_FOR_IOS,
    redirectUri: "https://auth.expo.io/@your-username/your-app-slug",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      // Xử lý đăng nhập Google thành công tại đây (ví dụ: lấy thông tin người dùng)
    }
  }, [response]);

  const onSubmit = async (values: FormValues, resetForm: () => void) => {
    resetForm();
    // Xử lý đăng nhập thông thường tại đây
  };

  return (
    <View className="flex-1 justify-center bg-white p-5">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values: FormValues, { resetForm }) =>
          onSubmit(values, resetForm)
        }
      >
        {({
          handleChange,
          touched,
          handleSubmit,
          values,
          errors,
          setFieldTouched,
        }) => (
          <View className="gap-4">
            <ResuableText
              text="ĐĂNG NHẬP"
              fontFamily={FONTFAMILY.SpaceMono}
              fontWeight="700"
              size={FONTSIZE.size_24}
            />
            <View className="mb-4">
              <View className="flex-row items-center border-b border-b-color_primary rounded-lg px-4 bg-white">
                <TextInput
                  placeholder="Email"
                  onFocus={() => setFieldTouched("email")}
                  onBlur={() => setFieldTouched("email")}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="#392C7A"
                  className="flex-1 font-bold text-base text-color_primary placeholder:opacity-60"
                />
              </View>
              {touched.email && errors.email && (
                <Text className="text-red-500 mt-2">{errors.email}</Text>
              )}
            </View>

            <View className="mb-4">
              <View className="flex-row items-center border-b border-b-color_primarys rounded-lg px-4 bg-white">
                <TextInput
                  secureTextEntry={obsecureText}
                  placeholder="Mật khẩu"
                  onFocus={() => setFieldTouched("password")}
                  onBlur={() => setFieldTouched("password")}
                  placeholderTextColor="#392C7A"
                  onChangeText={handleChange("password")}
                  value={values.password}
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="flex-1 placeholder:font-bold text-base placeholder:opacity-60 placeholder:text-color_primary"
                  textContentType="password"
                />
                <TouchableOpacity
                  onPress={() => setObsecureText(!obsecureText)}
                >
                  <MaterialCommunityIcons
                    name={obsecureText ? "eye-outline" : "eye-off-outline"}
                    size={18}
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text className="text-red-500 mt-2">{errors.password}</Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}
            >
              <ResuableText
                text={"Đăng nhập"}
                color="white"
                fontFamily={FONTFAMILY.SpaceMono}
                moreStyles={{
                  borderWidth: 1,
                  backgroundColor: "#3014BA",
                  paddingVertical: SPACING.space_10,
                  borderRadius: 10,
                }}
                size={FONTSIZE.size_18}
              />
            </TouchableOpacity>
            <View className="flex-row justify-center items-center">
              <TouchableOpacity className="mr-2">
                <ResuableText
                  text={"Quên mật khẩu?"}
                  color={"#3014BA"}
                  fontFamily={FONTFAMILY.SpaceMono}
                  size={FONTSIZE.size_14}
                  textDecorationLine="underline"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/signup")}>
                <ResuableText
                  text={"Đăng kí"}
                  color={"#3014BA"}
                  fontFamily={FONTFAMILY.SpaceMono}
                  moreStyles={{
                    backgroundColor: "transparent",
                    paddingVertical: SPACING.space_16,
                  }}
                  size={FONTSIZE.size_14}
                  textDecorationLine="underline"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>

      {/* Đăng nhập bằng Google */}
      <View className="flex items-center justify-center mt-10">
        <View className="flex-row items-center justify-between w-full px-4">
          <View className="border-t border-color_primary flex-grow" />
          <Text className="px-4 text-color_primary">hoặc</Text>
          <View className="border-t border-color_primary flex-grow" />
        </View>
        <TouchableOpacity
          className="bg-pink-100 mt-4 py-2 px-6 rounded-lg"
          disabled={!request}
          onPress={() => promptAsync()} // Sử dụng proxy
        >
          <Text className="text-primary font-medium text-lg">
            Đăng nhập bằng Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SigninScreen;