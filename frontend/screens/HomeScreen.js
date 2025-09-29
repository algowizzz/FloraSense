import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity 
        style={styles.backBtn} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#2d6a4f" />
      </TouchableOpacity>

      <Text style={styles.text}>Welcome to Home Screen! 🌿</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  text: { fontSize: 20, fontWeight: "bold", color: "#2d6a4f" },
});
