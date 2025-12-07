import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#F0F5EC" }}>
      <View style={styles.greenHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#f0f5ec" />
        </TouchableOpacity>
        <Text style={styles.greenHeaderTitle}>SETTINGS</Text>
        <Text style={styles.greenHeaderSubtitle}>Customize your app experience</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#f0f5ec", true: "#1b433299" }}
              thumbColor={notifications ? "#1B4332" : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#f0f5ecff", true: "#1b433299" }}
              thumbColor={darkMode ? "#1B4332" : "#f4f3f4ff"}
            />
          </View>

          <TouchableOpacity style={styles.settingRow} onPress={() => alert("Clear Cache!")}>
            <Text style={styles.settingLabel}>Clear Cache</Text>
            <Ionicons name="chevron-forward" size={20} color="#1B4332" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav activeNav="person" navigation={navigation} isLoggedIn={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  greenHeader: {
    width: "100%",
    backgroundColor: "#1B4332",
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    alignItems: "center",
    position: "relative",
  },
  backBtn: { position: "absolute", top: 70, left: 20 },
  greenHeaderTitle: { color: "#f0f5ec", fontSize: 26, fontWeight: "800" },
  greenHeaderSubtitle: { color: "#f0f5ec", opacity: 0.8, marginTop: 5 },

  card: {
    backgroundColor: "#ddeedc",
    marginHorizontal: 22,
    marginTop: 30,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
  },

  settingRow: {
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  settingLabel: {
    fontSize: 16,
    color: "#1B4332",
    fontWeight: "600",
  },
});
