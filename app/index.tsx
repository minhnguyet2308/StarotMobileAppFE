import TabNavigator from "@/navigators";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SigninScreen from "./(tabs)/(auth)/signin";
import SignupScreen from "./(tabs)/(auth)/signup";
import ReaderService from "./(tabs)/(service)/readerService";
import ReaderDetailService from "./(tabs)/(service)/readerDetailService";
import ReaderNav from "@/navigators/readerNav";
const Stack = createStackNavigator();
const App = () => {
  return (
    <Stack.Navigator initialRouteName="signin">
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
