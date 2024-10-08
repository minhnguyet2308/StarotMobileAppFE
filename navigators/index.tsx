import ProfileScreen from "@/app/(tabs)/(profile)/profile";
import ShopScreen from "@/app/(tabs)/(service)/service";
import ServiceScreen from "@/app/(tabs)/(shop)/shop";
import HomeScreen from "@/app/(tabs)/home";
import { SPACING } from "@/utils/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text } from "react-native";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarStyle: [styles.tabBarStyle],
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarIcon: () => null,
        tabBarLabel: ({ focused }) => {
          let label;
          switch (route.name) {
            case "home":
              label = "HOME";
              break;
            case "service":
              label = "DỊCH VỤ";
              break;
            case "shop":
              label = "CỬA HÀNG";
              break;
            case "profile":
              label = "PROFILE";
              break;
          }
          return (
            <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
              {label}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="service" component={ServiceScreen} />
      <Tab.Screen name="shop" component={ShopScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: SPACING.space_24 * 3,
    borderTopColor: "#3014BA",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  tabBarLabelStyle: {
    fontSize: 16,
    fontWeight: "600",
  },
  tabLabel: {
    color: "#392C7A",
    fontWeight: "bold",
    textAlign: "center",
  },
  tabLabelFocused: {
    color: "#3014BA",
    fontWeight: "bold",
    textAlign: "center",
  },
  tabBarItemStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: SPACING.space_24 * 1.5,
  },
});
