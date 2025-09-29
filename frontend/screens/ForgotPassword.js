// screens/ForgotPasswordScreen.js
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity 
            style={styles.backBtn} 
            onPress={() => navigation.goBack()}
        >
            <Ionicons name="arrow-back" size={28} color="#2d6a4f" />
        </TouchableOpacity>

      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Don’t worry! Just enter your email and we’ll send you a reset link.
      </Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#777"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.iconWrapper}>
          <Ionicons name="mail-outline" size={22} color="#555" />
        </View>
      </View>

      {/* Reset Button */}
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Send Reset Link</Text>
      </TouchableOpacity>

      {/* Back to Login */}
      <Text style={styles.footer}>
        Remembered your password?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Login")}
        >
          Back to Login
        </Text>
      </Text>
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
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 40,
    fontFamily: "AvenirNext-Bold",
    fontWeight: "bold",
    color: "#2d4a22",
    marginBottom: 20,
    marginRight: "auto",
  },
  subtitle: {
    fontFamily: "AvenirNext-Regular",
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 20,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#e3e8da",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: "AvenirNext-Regular",
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  loginBtn: {
    marginTop: 15,
    width: "100%",
    backgroundColor: "#2d6a4f",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "AvenirNext-Bold",
  },
  footer: {
    fontFamily: "AvenirNext-Regular",
    fontSize: 15,
    marginTop: 10,
  },
  link: {
    fontFamily: "AvenirNext-Medium",
    fontSize: 15,
    color: "#2d6a4f",
    fontWeight: "500",
  },
});
