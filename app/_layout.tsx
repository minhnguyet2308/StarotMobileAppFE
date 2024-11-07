import CustomSplashScreen from "@/components/CustomSplashScreen";
import { AuthContextProvider } from "@/context/authContext";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();
const RootLayout = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        setShowSplash(false);
        SplashScreen.hideAsync();
      }, 3000);
    }
  }, [loaded]);
  if (!loaded || showSplash) {
    return <CustomSplashScreen />;
  }

  return (
    <AuthContextProvider>
      <Slot />
      <Toast />
    </AuthContextProvider>
  );
};

export default RootLayout;
