import { router } from "expo-router";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SigninScreen from "./(tabs)/(auth)/signin";
import SignupScreen from "./(tabs)/(auth)/signup";
const Stack = createStackNavigator();
const App = () => {
  return (
    <Stack.Navigator initialRouteName="signup">
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
    </Stack.Navigator>
  );
};

export default App;
