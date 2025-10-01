import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Account</Text>
      <Text style={styles.subtitle}>Manage your profile and settings here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#eef2e6" },
  title: { fontSize: 32, fontWeight: "bold", color: "#2d6a4f", marginBottom: 10 },
  subtitle: { fontSize: 18, color: "#555", textAlign: "center" },
});
