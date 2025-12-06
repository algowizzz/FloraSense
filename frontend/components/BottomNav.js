import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BottomNav({ activeNav, navigation, isLoggedIn }) {
  const items = [
    { key: "home", icon: "home" },
    { key: "heart", icon: "heart" },
    { key: "cart", icon: "cart" },
    { key: "person", icon: "person" },
  ];

  return (
    <View style={styles.bottomArea}>
      <View style={styles.navContainer}>
        {items.map((nav) => (
          <TouchableOpacity
            key={nav.key}
            style={[styles.navItem, activeNav === nav.key && styles.activeNavItem]}
            onPress={() => {
              if (nav.key === "cart") navigation.navigate("CartScreen");
              else if (nav.key === "heart") navigation.navigate("FavouriteScreen");
              else if (nav.key === "person") {
                isLoggedIn
                  ? navigation.navigate("Account")
                  : navigation.navigate("Login");
              } else {
                navigation.navigate("Home");
              }
            }}
          >
            <Ionicons
              name={nav.icon}
              size={24}
              color={activeNav === nav.key ? "#1B4332" : "#DDE5D8"}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomArea: {
    position: "absolute", left: 0, right: 0, bottom: 0, height: 50,
    backgroundColor: "#F0F5EC",
  },
  navContainer: {
    position: "absolute", bottom: 40, left: 20, right: 20,
    flexDirection: "row", justifyContent: "space-around",
    backgroundColor: "#1B4332", borderRadius: 40, padding: 10,
  },
  navItem: {
    width: 45, height: 45, borderRadius: 25,
    justifyContent: "center", alignItems: "center",
  },
  activeNavItem: {
    backgroundColor: "#fff", width: 45, height: 45, borderRadius: 25,
    justifyContent: "center", alignItems: "center",
  },
});
