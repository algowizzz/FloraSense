// AccountScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AccountScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      {/* Profile */}
      <View style={styles.profileWrapper}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          }}
          style={styles.profileImage}
        />
      </View>

      {/* Name + Email */}
      <Text style={styles.title}>Hello</Text>
      <Text style={styles.subtitle}>hello@example.com</Text>

      {/* Account */}
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.optionRow}>
          <Ionicons name="cart-outline" size={24} color="#2d6a4f" />
          <Text style={styles.optionText}>My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Ionicons name="heart-outline" size={24} color="#2d6a4f" />
          <Text style={styles.optionText}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Ionicons name="settings-outline" size={24} color="#2d6a4f" />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Ionicons name="help-circle-outline" size={24} color="#2d6a4f" />
          <Text style={styles.optionText}>Help & Support</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2e6",
    alignItems: "center",
    padding: 30,
  },

  backBtn: {
    position: "absolute",
    top: 50, 
    left: 20,
    zIndex: 10,
  },

  profileWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  title: {
    fontSize: 28,
    fontFamily: "AvenirNext-Bold",
    fontWeight: "bold",
    color: "#2d4a22",
    marginTop: 10,
  },

  subtitle: {
    fontFamily: "AvenirNext-Medium",
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },

  optionContainer: {
    width: "100%",
    backgroundColor: "#e3e8da",
    borderRadius: 20,
    padding: 15,
    marginBottom: 30,
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.5,
  },

  optionText: {
    fontSize: 16,
    fontFamily: "AvenirNext-Medium",
    marginLeft: 15,
    color: "#2d4a22",
  },

  logoutBtn: {
    width: "100%",
    backgroundColor: "#2d6a4f",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },

  logoutText: {
    fontFamily: "AvenirNext-Bold",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
