// screens/LoginScreen.js
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>
        It’s time to return to the soil! Log in to your account and keep growing. 🌱
      </Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput placeholder="Email" style={styles.input} />
        <View style={styles.iconWrapper}>
          <Ionicons name="mail-outline" size={30} color="#555" />
        </View>
      </View>


      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={30}
            color="#555"
          />
        </TouchableOpacity>
      </View>


      {/* Remember Me & Forgot Password */}
      <View style={styles.options}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            thumbColor={rememberMe ? "#2d6a4f" : "#000000ff"}
          />
          <Text style={styles.rememberText}> Remember Me</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.divider}>Or</Text>

      {/* Social Login */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialBtn}>
          <AntDesign name="google" size={30} color="#20340a" />
          <Text style={styles.socialText}> Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBtn}>
          <AntDesign name="apple" size={30} color="#20340a" />
          <Text style={styles.socialText}> Apple</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Don’t have an account yet?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Signup")}>
          Sign Up
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
  title: {
    fontSize: 40,
    fontFamily: 'AvenirNext-Bold',
    fontWeight: "bold",
    color: "#1f4013",
    marginBottom: 20,
    marginRight: 'auto',
  },
  subtitle: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 15,
    color: "#7f8278",
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
    fontFamily: 'AvenirNext-Regular',
  },
  icon: {
    // marginLeft: 10,
  },
  iconWrapper: {
  width: 50,
  height: 50,
  borderRadius: 50,
  backgroundColor: "#f9feef",
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
  },
  options: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberText: {
    fontSize: 15,
    color: "#444",
    fontFamily: 'AvenirNext-Regular',
  },
  link: {
    fontSize: 15,
    color: "#648855",
    fontWeight: "500",
    fontFamily: 'AvenirNext-Regular',
  },
  loginBtn: {
    marginTop: 15,
    width: "100%",
    backgroundColor: "#3e6a30",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: 'AvenirNext-Bold',
  },
  divider: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 15,
    color: "#444",
    marginBottom: 20,
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
    backgroundColor: "#f9feef",
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  socialText: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
    color: "#20340a",
  },
  footer: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 15,
    marginTop: 10,
    color: '#1e201b',
  },
  link: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: 15,
    color: "#648855",
    fontWeight: "500",
  },
});
