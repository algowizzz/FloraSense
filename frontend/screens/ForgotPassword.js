import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.navigate("Login")}
      >
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Don’t worry! Just enter your email and we’ll send you a reset link.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#777"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.iconWrapper}>
          <Ionicons name="mail-outline" size={20} color="#555" />
        </View>
      </View>

      <Button
        mode="contained"
        style={styles.resetBtn}
        labelStyle={styles.resetText}
      >
        Send Reset Link
      </Button>

      <Text style={styles.footer}>
        Remembered your password?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Back to Login
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8eddf",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },

  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },

  title: {
    fontSize: 30,
    fontFamily: "AvenirNext-Bold",
    fontWeight: "bold",
    color: "#3e6a30",
    marginBottom: 20,
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
    backgroundColor: "#dde2d3",
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
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#faffec",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  resetBtn: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#3e6a30",
    paddingVertical: 5,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },

  resetText: {
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "AvenirNext-Bold",
    fontSize: 18, 
  },

  footer: {
    fontFamily: "AvenirNext-Regular",
    fontSize: 14,
    marginTop: 10,
  },

  link: {
    fontFamily: "AvenirNext-Medium",
    fontSize: 14,
    color: "#3e6a30",
    fontWeight: "500",
  },
});
