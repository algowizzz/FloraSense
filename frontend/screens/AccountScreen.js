import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await AsyncStorage.getItem("currentUser");
    if (data) setUser(JSON.parse(data));
  };

  const logout = async () => {
    await AsyncStorage.removeItem("currentUser");
    navigation.replace("Login");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F0F5EC" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Account</Text>
          <Text style={styles.subtitle}>Manage your profile & settings 🌿</Text>
        </View>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#1B4332" />
          </View>

          <View>
            <Text style={styles.profileName}>
              {user?.name || "Guest User"}
            </Text>
            <Text style={styles.profileEmail}>
              {user?.email || "No email available"}
            </Text>
          </View>
        </View>
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("EditProfileScreen")}
          >
            <Text style={styles.menuText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color="#1B4332" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("MyOrdersScreen")}
          >
            <Text style={styles.menuText}>My Orders</Text>
            <Ionicons name="chevron-forward" size={20} color="#1B4332" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("SettingsScreen")}
          >
            <Text style={styles.menuText}>Settings</Text>
            <Ionicons name="chevron-forward" size={20} color="#1B4332" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("HelpContactScreen")}
          >
            <Text style={styles.menuText}>Help & Contact</Text>
            <Ionicons name="chevron-forward" size={20} color="#1B4332" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
      <BottomNav activeNav="person" navigation={navigation} isLoggedIn={true} />
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#1B4332",
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    alignItems: "center",
  },

  title: {
    color: "#f0f5ec",
    fontSize: 25,
    fontWeight: "bold",
  },
  
  subtitle: {
    color: "#f0f5ec",
    fontSize: 15,
    marginTop: 5,
    opacity: 0.9,
  },

  profileCard: {
    backgroundColor: "#ddeedc",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 25,
  },

  avatar: {
    width: 60,
    height: 60,
    backgroundColor: "#f0f5ec",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },

  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1b4332",
  },

  profileEmail: {
    fontSize: 14,
    color: "#1b4332ea",
    marginTop: 3,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1b4332",
    marginBottom: 10,
    marginLeft: 5,
  },

  menuSection: {
    backgroundColor: "#ddeedc",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
  },

  menuItem: {
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  menuText: {
    fontSize: 16,
    color: "#1B4332",
    fontWeight: "500",
  },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1B4332",
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: "center",
    marginBottom: 40,
  },

  logoutText: {
    color: "#f0f5ec",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
