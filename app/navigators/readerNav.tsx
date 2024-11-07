import Notification from "@/app/(reader)/(notification)/notification";
import Schedule from "@/app/(reader)/(schedule)/schedule";
import { SPACING } from "@/utils/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text } from "react-native";
import UserInfo from "../(tabs)/(user)/user-info";

const Tab = createBottomTabNavigator();

const ReaderNav = () => {
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
            case "schedule":
              label = "LỊCH TRÌNH";
              break;
            case "Notification":
              label = "THÔNG BÁO";
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
      <Tab.Screen name="schedule" component={Schedule} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="profile" component={UserInfo} />
    </Tab.Navigator>
  );
};

export default ReaderNav;

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
