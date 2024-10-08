import { View, Image } from "react-native";
import React, { ReactNode } from "react";

const cloundBt = require("@/assets/images/cloundbt.png");
const cloundT = require("@/assets/images/cloundt.png");
const logo = require("@/assets/images/logo.png");

interface ViewContainerProps {
  children: ReactNode;
  showLogo?: boolean;
}

const ViewContainer: React.FC<ViewContainerProps> = ({
  children,
  showLogo,
}) => {
  return (
    <View className={`flex-1 justify-between bg-white`}>
      <View className="relative  justify-center items-center">
        <Image
          source={cloundBt}
          className={`w-screen h-56`}
          resizeMode="cover"
        />
        {showLogo ? (
          <View className="absolute">
            <Image source={logo} resizeMode="contain" className="h-10"/>
          </View>
        ) : null}
      </View>
      <View className={`flex-1 justify-start items-center`}>
        {children}
      </View>
      <Image source={cloundT} className={`w-full h-56`} resizeMode="cover" />
    </View>
  );
};

export default ViewContainer;
