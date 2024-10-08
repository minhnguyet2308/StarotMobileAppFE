import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import React, { ReactNode } from "react";

interface ResuableTitileProps {
  text?: string;
  size?: number;
  color?: string;
  fontWeight?: string;
  textAlign?: string;
  fontFamily?: string;
  textDecorationLine?: string;
  moreStyles?: any;
  numberOfLines?: number;
  iconRight?: ReactNode;
}
const ResuableTitile: React.FC<ResuableTitileProps> = ({
  text,
  size,
  color = "#3014BA",
  fontWeight,
  textAlign = "center",
  fontFamily,
  textDecorationLine,
  moreStyles,
  numberOfLines,
  iconRight,
}) => {
  const textStyle = {
    fontSize: size,
    color: color,
    fontWeight: fontWeight,
    textAlign: textAlign || "center",
    fontFamily: fontFamily,
    textDecorationLine: textDecorationLine,
  } as ViewStyle;
  return (
    <View className="flex-row justify-between items-center w-full">
      <Text numberOfLines={numberOfLines} style={[textStyle, moreStyles]}>
        {text}
      </Text>
      {iconRight}
    </View>
  );
};
export default ResuableTitile;
