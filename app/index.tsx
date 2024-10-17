import TabNavigator from "@/app/navigators";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SigninScreen from "./(tabs)/(auth)/signin";
import SignupScreen from "./(tabs)/(auth)/signup";
import ReaderService from "./(tabs)/(service)/readerService";
import ReaderDetailService from "./(tabs)/(service)/readerDetailService";
import ReaderNav from "@/app/navigators/readerNav";
import { useAuth } from "@/context/authContext";
const Stack = createStackNavigator();
const App = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    <Stack.Navigator
      initialRouteName={
        isAuthenticated && user?.role === "Customer"
          ? "TabNavigator"
          : isAuthenticated
          ? "ReaderNav"
          : "signin"
      }
    >
      <Stack.Screen
        name="signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signin"
        component={SigninScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReaderService"
        component={ReaderService}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReaderDetailService"
        component={ReaderDetailService}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReaderNav"
        component={ReaderNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default App;
