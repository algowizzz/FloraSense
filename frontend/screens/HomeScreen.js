import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [activeNav, setActiveNav] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const categories = [
    "All",
    "Indoor",
    "Outdoor",
    "Succulents",
    "Flowering",
    "Herbs",
    "AirPurifiers",
  ];

  useEffect(() => {
    fetch("http://localhost:5001/api/plants") // change to IP if using real device
      .then((res) => res.json())
      .then((data) => {
        console.log("API Plants:", data.data);
        setPlants(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("API ERROR:", err);
        setLoading(false);
      });
  }, []);

  // Filter plants based on category (fallback)
  const filteredPlants =
    activeTab === "All"
      ? plants
      : plants.filter((p) =>
          (p.type || "").toLowerCase().includes(activeTab.toLowerCase())
        );

  // -------------------------
  // Render each plant card
  // -------------------------
  const renderPlantCard = ({ item }) => (
    <View style={styles.card}>
      {/* Heart Button */}
      <TouchableOpacity style={styles.heartBtn}>
        <Ionicons name="heart-outline" size={20} color="white" />
      </TouchableOpacity>

      {/* Plant Image */}
      <Image
        source={{
          uri:
            item.default_image?.original_url ||
            "https://via.placeholder.com/200",
        }}
        style={styles.plantImage}
      />

      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.plantName}>
            {item.common_name || "Unknown Plant"}
          </Text>

          <Text style={styles.price}>
            ${item.price || "19.99"} {/* Dummy price */}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.arrowBtn}
          onPress={() => navigation.navigate("Details", { plant: item })}
        >
          <Ionicons name="arrow-forward" size={22} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // -------------------------
  // Loading Screen
  // -------------------------
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Loading plants...
        </Text>
      </View>
    );
  }

  // -------------------------
  // MAIN UI
  // -------------------------
  return (
    <View style={styles.container}>
      {/* HEADER */}
      {activeNav === "home" && (
        <View style={styles.header}>
          <Text style={styles.title}>
            Find Your{"\n"}
            <Text style={styles.highlight}>Favorite Plants</Text>
          </Text>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="search" size={20} color="#1B4332" />
          </TouchableOpacity>
        </View>
      )}

      {/* TABS */}
      {activeNav === "home" && (
        <View style={styles.tabsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          >
            {categories.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.tabActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[styles.tabText, activeTab === tab && styles.tabTextActive]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* PLANT LIST */}
      {activeNav === "home" && (
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPlantCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 20 }}
        />
      )}

      {/* OTHER SCREENS */}
      {activeNav === "heart" && (
        <View style={styles.screenCenter}>
          <Text style={styles.screenText}>❤️ Favorites Screen</Text>
        </View>
      )}

      {activeNav === "cart" && (
        <View style={styles.screenCenter}>
          <Text style={styles.screenText}>🛒 Cart Screen</Text>
        </View>
      )}

      {activeNav === "person" && isLoggedIn && (
        <View style={styles.screenCenter}>
          <Text style={styles.screenText}>👤 Profile Screen</Text>
        </View>
      )}

      {/* BOTTOM NAV */}
      <View style={styles.bottomArea}>
        <View style={styles.navContainer}>
          {[
            { key: "home", icon: "home" },
            { key: "heart", icon: "heart" },
            { key: "cart", icon: "cart" },
            { key: "person", icon: "person" },
          ].map((nav) => (
            <TouchableOpacity
              key={nav.key}
              style={[styles.navItem, activeNav === nav.key && styles.activeNavItem]}
              onPress={() => setActiveNav(nav.key)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F5EC", paddingTop: 30 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  title: { fontSize: 15, marginTop: 30, color: "#333" },
  highlight: { fontSize: 25, fontWeight: "bold", color: "#1B4332" },

  searchBtn: {
    backgroundColor: "#DDEEDC",
    marginTop: 30,
    padding: 10,
    borderRadius: 50,
  },

  tab: {
    backgroundColor: "#E6E6E6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    marginRight: 10,
  },
  tabActive: { backgroundColor: "#1B4332" },
  tabText: { fontSize: 15, color: "#333" },
  tabTextActive: { color: "#fff" },

  tabsContainer: { marginTop: 10 },

  card: {
    backgroundColor: "#DDEEDC",
    borderRadius: 25,
    padding: 5,
    marginBottom: 30,
  },

  plantImage: {
    width: "100%",
    height: 250,
    marginBottom: 20,
  },

  heartBtn: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "#1B4332",
    borderRadius: 50,
    padding: 5,
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  plantName: {
    fontSize: 18,
    marginLeft: 20,
    fontWeight: "600",
    color: "#1B4332",
  },

  price: {
    fontSize: 15,
    marginLeft: 20,
    fontWeight: "bold",
    color: "#1B4332",
  },

  arrowBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1B4332",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },

  bottomArea: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    backgroundColor: "#F0F5EC",
  },

  navContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1B4332",
    padding: 10,
    borderRadius: 40,
  },

  navItem: {
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  activeNavItem: {
    backgroundColor: "#fff",
  },

  screenCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  screenText: { fontSize: 22, fontWeight: "bold" },
});

