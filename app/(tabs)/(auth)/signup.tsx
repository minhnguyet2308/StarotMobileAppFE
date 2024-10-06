import ResuableText from "@/components/ResuableText";
import { FONTFAMILY, FONTSIZE, SPACING } from "@/utils/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Formik } from "formik";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";

WebBrowser.maybeCompleteAuthSession();

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Bắt buộc nhập tên tài khoản"),
  email: Yup.string()
    .email("Vui lòng cung cấp một email hợp lệ")
    .required("Bắt buộc nhập email"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
    .required("Bắt buộc nhập số điện thoại"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Bắt buộc nhập mật khẩu"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
    .required("Bắt buộc xác nhận mật khẩu"),
});

const SignupScreen: React.FC = () => {
  const [obsecureText, setObsecureText] = useState<boolean>(true);

  const onSubmit = async (values: FormValues, resetForm: () => void) => {
    resetForm();
    // Xử lý đăng ký thông thường tại đây
  };

  return (
    <View className="flex-1 justify-center bg-white p-5">
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
        }}
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
              text="ĐĂNG KÝ"
              fontFamily={FONTFAMILY.SpaceMono}
              fontWeight="700"
              size={FONTSIZE.size_24}
            />
            {/* Trường username */}
            <View className="mb-4">
              <View className="flex-row items-center border-b border-b-color_primary rounded-lg px-4 bg-white">
                <TextInput
                  placeholder="Tên tài khoản"
                  onFocus={() => setFieldTouched("username")}
                  onBlur={() => setFieldTouched("username")}
                  value={values.username}
                  onChangeText={handleChange("username")}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="#392C7A"
                  className="flex-1 font-bold text-base text-color_primary placeholder:opacity-60"
                />
              </View>
              {touched.username && errors.username && (
                <Text className="text-red-500 mt-2">{errors.username}</Text>
              )}
            </View>

            {/* Trường email */}
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

            {/* Trường phone */}
            <View className="mb-4">
              <View className="flex-row items-center border-b border-b-color_primary rounded-lg px-4 bg-white">
                <TextInput
                  placeholder="Số điện thoại"
                  onFocus={() => setFieldTouched("phone")}
                  onBlur={() => setFieldTouched("phone")}
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  keyboardType="numeric"
                  placeholderTextColor="#392C7A"
                  className="flex-1 font-bold text-base text-color_primary placeholder:opacity-60"
                />
              </View>
              {touched.phone && errors.phone && (
                <Text className="text-red-500 mt-2">{errors.phone}</Text>
              )}
            </View>

            {/* Trường password */}
            <View className="mb-4">
              <View className="flex-row items-center border-b border-b-color_primary rounded-lg px-4 bg-white">
                <TextInput
                  secureTextEntry={obsecureText}
                  placeholder="Mật khẩu"
                  onFocus={() => setFieldTouched("password")}
                  onBlur={() => setFieldTouched("password")}
                  onChangeText={handleChange("password")}
                  value={values.password}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="#392C7A"
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

            {/* Trường confirm password */}
            <View className="mb-4">
              <View className="flex-row items-center border-b border-b-color_primary rounded-lg px-4 bg-white">
                <TextInput
                  secureTextEntry={obsecureText}
                  placeholder="Xác nhận mật khẩu"
                  onFocus={() => setFieldTouched("confirmPassword")}
                  onBlur={() => setFieldTouched("confirmPassword")}
                  onChangeText={handleChange("confirmPassword")}
                  value={values.confirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="#392C7A"
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
              {touched.confirmPassword && errors.confirmPassword && (
                <Text className="text-red-500 mt-2">
                  {errors.confirmPassword}
                </Text>
              )}
            </View>

            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}
            >
              <ResuableText
                text={"Đăng ký"}
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
              <ResuableText
                text={"Đã có tài khoản?"}
                color={"#3014BA"}
                fontFamily={FONTFAMILY.SpaceMono}
                size={FONTSIZE.size_14}
              />
              <TouchableOpacity onPress={() => router.push("/signin")}>
                <ResuableText
                  text={"Đăng nhập"}
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
    </View>
  );
};

export default SignupScreen;
