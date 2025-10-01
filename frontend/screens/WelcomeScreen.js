// screens/WelcomeScreen.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function WelcomeScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home"); 
    }, 2000);

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Ionicons name="leaf-outline" size={50} color="#234821" style={styles.icon} />
        <Text style={styles.title}>FLORASENSE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8eddf",
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    position: "relative",
    alignItems: "center", 
  },
  icon: {
    position: "absolute",
    top: -50,
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#234821",
    fontFamily: "AvenirNext-Bold",
  },
});
