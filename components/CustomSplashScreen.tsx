import React from "react";
import { Image, StyleSheet, View } from "react-native";

const CustomSplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/adaptiveApp.png")}
        style={styles.image}
        className="w-full h-full flex-1"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  image: {
    margin: 10,
    objectFit: "cover",
  },
});

export default CustomSplashScreen;
