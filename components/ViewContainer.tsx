import { View, Image } from "react-native";
import React, { ReactNode } from "react";
import { ScrollView } from "react-native-gesture-handler";

const cloundBt = require("@/assets/images/cloundbt.png");
const cloundT = require("@/assets/images/cloundt.png");
const logo = require("@/assets/images/logo.png");

interface ViewContainerProps {
  children: ReactNode;
  showLogo?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
}

const ViewContainer: React.FC<ViewContainerProps> = ({
  children,
  showLogo,
  showFooter,
  showHeader,
}) => {
  return (
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
      <ScrollView
        className={`${showHeader ? "-mt-12" : null} ${
          showFooter ? "-mb-40" : null
        }`}
      >
        {children}
      </ScrollView>
      {showFooter ? (
        <Image
          source={cloundT}
          className={`w-full fixed h-52`}
          resizeMode="cover"
        />
      ) : null}
    </View>
  );
};

export default ViewContainer;
