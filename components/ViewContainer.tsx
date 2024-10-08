import React, { ReactNode } from "react";
import { Image, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

const cloundBt = require("@/assets/images/cloundbt.png");
const cloundT = require("@/assets/images/cloundt.png");
const logo = require("@/assets/images/logo.png");

interface ViewContainerProps {
  children: ReactNode;
  showLogo?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  isScroll?: boolean;
}

const ViewContainer: React.FC<ViewContainerProps> = ({
  children,
  showLogo,
  showFooter,
  showHeader,
  isScroll = true,
}) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className={`flex-1 justify-between bg-white`}>
        {showHeader ? (
          <View className="relative z-10 justify-center items-center">
            <Image
              source={cloundBt}
              className={`w-screen h-44`}
              resizeMode="cover"
            />
            {showLogo ? (
              <View className="absolute">
                <Image source={logo} resizeMode="contain" className="h-10" />
              </View>
            ) : null}
          </View>
        ) : null}
        {isScroll ? (
          <ScrollView
            className={`${showHeader ? "-mt-12" : null} ${
              showFooter ? "-mb-40" : null
            }`}
          >
            <View className="flex-1">{children}</View>
          </ScrollView>
        ) : (
          <View className={`flex-1 justify-start items-center`}>
            {children}
          </View>
        )}
        {showFooter ? (
          <Image
            source={cloundT}
            className={`w-full fixed h-52`}
            resizeMode="cover"
          />
        ) : null}
      </View>
    </GestureHandlerRootView>
  );
};

export default ViewContainer;
