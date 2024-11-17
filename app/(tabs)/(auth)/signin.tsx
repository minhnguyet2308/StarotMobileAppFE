import ResuableText from "@/components/ResuableText";
import { useAuth } from "@/context/authContext";
import { FONTFAMILY, FONTSIZE, SPACING } from "@/utils/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import * as Google from "expo-auth-session/providers/google";
import { GOOGLE_CLIENT_ID_FOR_ANDROID } from "@/constants/google";

WebBrowser.maybeCompleteAuthSession();

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(4, "Mật khẩu phải có ít nhất 4 ký tự")
    .required("Bắt buộc"),
  email: Yup.string()
    .email("Vui lòng cung cấp một email hợp lệ")
    .required("Bắt buộc"),
});

const SigninScreen: React.FC = () => {
  const { login } = useAuth();
  const [obsecureText, setObsecureText] = useState<boolean>(true);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "348740489498-fa25h0m2lj75opnij8gasl8uf31oshu4.apps.googleusercontent.com",
    redirectUri: "https://expo.dev/accounts/minhhoangdev/projects/StarotApp",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
    }
  }, [response]);

  const onSubmit = async (values: FormValues) => {
    login(values.email, values.password);
  };

  return (
    <View className="flex-1 justify-center bg-white p-5">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values: FormValues) => onSubmit(values)}
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
            {/* <View className="flex-row justify-center items-center">
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
            </View> */}
          </View>
        )}
      </Formik>

      <View className="flex items-center justify-center mt-10">
        <View className="flex-row items-center justify-between w-full px-4">
          <View className="border-t border-color_primary flex-grow" />
          <Text className="px-4 text-color_primary">hoặc</Text>
          <View className="border-t border-color_primary flex-grow" />
        </View>
        <TouchableOpacity
          className="bg-pink-100 mt-4 py-2 px-6 rounded-lg"
          disabled={!request}
          onPress={() => promptAsync()}
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
