import { router } from "expo-router";
import React from "react";
import { View, Text, Button } from "react-native";

const App = () => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Button
        onPress={() => router.push("/signin")}
        className="text-lg font-bold text-blue-500"
        title="Hello, NativeWind!"
      />
    </View>
  );
};

export default App;
