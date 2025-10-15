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
      {/* 🔙 Back Button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      {/* 🏷️ Title */}
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>
        It’s time to return to the soil! Log in to your account and keep growing. 🌱
      </Text>

      {/* ✉️ Email Input */}
      <View style={styles.inputContainer}>
        <TextInput placeholder="Email" style={styles.input} />
        <View style={styles.iconWrapper}>
          <Ionicons name="mail-outline" size={30} color="#555" />
        </View>
      </View>

      {/* 🔒 Password Input */}
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

      {/* 🧠 Remember Me & Forgot Password */}
      <View style={styles.options}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            trackColor={{ false: "#ccc", true: "#6e975b" }}
            thumbColor={rememberMe ? "#213b19" : "#908f8fff"}
          />
          <Text style={styles.rememberText}> Remember Me</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* 🔘 Login Button */}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.replace("Account")}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.divider}>Or</Text>

      {/* 🌐 Social Logins */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialBtn}>
          <AntDesign name="google" size={30} color="#20340a" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBtn}>
          <AntDesign name="apple" size={30} color="#20340a" />
        </TouchableOpacity>
      </View>

      {/* 🦶 Footer */}
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

  backBtn: {
    position: "absolute",
    top: 50, 
    left: 20,
    zIndex: 10,
  },

  title: {
    fontSize: 40,
    fontFamily: 'AvenirNext-Bold',
    fontWeight: "bold",
    color: "#213b19",
    marginBottom: 20,
    marginRight: 'auto',
  },

  subtitle: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 15,
    color: "#84887b",
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

  iconWrapper: {
  width: 50,
  height: 50,
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
    backgroundColor: "#f3f7ec",
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
