// screens/WelcomeScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Plant Icon */}
      <Ionicons name="leaf-outline" size={80} color="#2d6a4f" style={styles.icon} />

      {/* Title */}
      <Text style={styles.title}>FloraSense</Text>
      <Text style={styles.subtitle}>
        Welcome 🌱 Let’s grow together.  
        Login or sign up to continue.
      </Text>

      {/* Social Login */}
      <TouchableOpacity style={styles.socialBtn}>
        <AntDesign name="google" size={20} color="#20340a" />
        <Text style={styles.socialText}> Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialBtn}>
        <AntDesign name="apple" size={20} color="#20340a" />
        <Text style={styles.socialText}> Continue with Apple</Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.divider}>OR</Text>

      {/* Continue with Email → goes to Signup first */}
      <TouchableOpacity
        style={styles.emailBtn}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.emailText}>Continue with Email</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2e6",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 50,
    fontFamily: 'AvenirNext-Bold',
    fontWeight: "bold",
    color: "#2d6a4f",
    marginBottom: 60,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'AvenirNext-Medium',
    color: "#444",
    textAlign: "center",
    marginBottom: 50,
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  socialText: {
    fontSize: 15,
    fontFamily: 'AvenirNext-Medium',
    fontWeight: "bold",
    marginLeft: 8,
    color: "#20340a",
  },
  divider: {
    fontSize: 15,
    fontFamily: 'AvenirNext-Medium',
    color: "#444",
    marginVertical: 20,
  },
  emailBtn: {
    width: "100%",
    backgroundColor: "#2d6a4f",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  emailText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: 'AvenirNext-Bold',
    fontWeight: "bold",
  },
});