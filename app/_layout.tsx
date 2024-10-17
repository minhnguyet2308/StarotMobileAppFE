import { AuthContextProvider } from "@/context/authContext";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();
const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <AuthContextProvider>
      <Slot />
      <Toast />
    </AuthContextProvider>
  );
};

export default RootLayout;
