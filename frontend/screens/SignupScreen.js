// screens/SignupScreen.js
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    navigation.navigate("Account");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>
        Create your account and start your journey with us 🌱
      </Text>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <View style={styles.iconWrapper}>
          <Ionicons name="person-outline" size={30} color="#20340a" style={styles.icon} />
        </View>
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.iconWrapper}>
          <Ionicons name="mail-outline" size={30} color="#20340a" style={styles.icon} />
        </View>
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setShowPassword(!showPassword)}
        >
        <View style={styles.iconWrapper}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={30}
            color="#20340a"
          />
        </View>
        </TouchableOpacity>
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
        <View style={styles.iconWrapper}>
          <Ionicons
            name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
            size={30}
            color="#20340a"
          />
        </View>
        </TouchableOpacity>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.divider}>Or</Text>

      {/* Social Sign Up */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialBtn}>
          <AntDesign name="google" size={30} color="#516B22" />
          <Text style={styles.socialText}> Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBtn}>
          <AntDesign name="apple" size={30} color="#516B22" />
          <Text style={styles.socialText}> Apple</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Already have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Login")}
        >
          Login
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

  title: {
    fontSize: 40,
    fontFamily: 'AvenirNext-Bold',
    fontWeight: "bold",
    color: "#2d4a22",
    marginBottom: 20,
    marginRight: 'auto',
  },

  subtitle: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: 16,
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
    fontSize: 14,
    fontFamily: 'AvenirNext-Regular',
    color: '#333',
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

  signupBtn: {
    width: "100%",
    backgroundColor: "#2d6a4f",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },

  signupText: {
    fontFamily: 'AvenirNext-Bold',
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  divider: {
    fontSize: 15,
    color: "#444",
    marginBottom: 15,
  },

  socialContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  socialBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 30,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  socialText: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
    color: '#20340a',
  },

  footer: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 15,
    marginTop: 10,
  },

  link: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: 15,
    color: "#2d6a4f",
    fontWeight: "500",
  },
});
