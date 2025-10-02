import React, { useState } from "react";
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
import { plants } from "../../data/plant";

export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("All");
  const [activeNav, setActiveNav] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const categories = ["All", "Indoor", "Outdoor", "Succulents", "Flowering", "Herbs", "AirPurifiers"];

  const filteredPlants =
    activeTab === "All" ? plants : plants.filter((p) => p.category === activeTab);

  const renderPlantCard = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity style={styles.heartBtn}>
        <Ionicons name="heart" size={30} color="#1B4332" />
      </TouchableOpacity>

      <Image source={{ uri: item.image }} style={styles.plantImage} resizeMode="contain" />

      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.plantName}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
        <TouchableOpacity style={styles.arrowBtn}>
          <Ionicons name="arrow-forward" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* App Logo (Top Left) */}
      <View style={styles.logoContainer}>
        <View style={styles.textWrapper}>
          <Ionicons name="leaf-outline" size={20} color="#234821" style={styles.icon} />
          <Text style={styles.logoText}>FLORASENSE</Text>
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Find Your{"\n"}
          <Text style={styles.highlight}>Favorite Plants</Text>
        </Text>
        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name="search" size={20} color="#1B4332" />
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
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
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Screens */}
      {activeNav === "home" && (
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => item.id}
          renderItem={renderPlantCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: -100, paddingHorizontal: 20 }}
        />
      )}

      {activeNav === "heart" && (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>🛒 Cart Screen</Text>
        </View>
      )}

      {activeNav === "cart" && (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>❤️ Favorites Screen</Text>
        </View>
      )}

      {activeNav === "person" && isLoggedIn && (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>👤 Profile Screen</Text>
        </View>
      )}

      {/* Bottom Navigation */}
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
            onPress={() => {
              if (nav.key === "person") {
                if (isLoggedIn) {
                  navigation.navigate("Account", { setIsLoggedIn });
                } else {
                  navigation.navigate("Login", { setIsLoggedIn });
                }
              } else {
                setActiveNav(nav.key);
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
  container: { 
    flex: 1, 
    backgroundColor: "#F0F5EC", 
    paddingTop: 80, 
    padding: 15,
  },

  logoContainer: {
    position: "absolute",  
    top: 60,         
    left: 34,
    alignItems: "center", 
    zIndex: 1000,
  },

  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#234821",
    marginTop: -3,  
    fontFamily: "AvenirNext-Bold", 
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },

  title: { 
    fontSize: 20, 
    marginTop: 30, 
    color: "#333", 
    fontWeight: "400", 
    fontFamily: "AvenirNext-Medium" 
  },

  highlight: { 
    fontSize: 30, 
    fontWeight: "bold", 
    color: "#1B4332", 
    fontFamily: "AvenirNext-Bold"
  },

  searchBtn: {
    backgroundColor: "#DDEEDC",
    marginTop: 50,
    padding: 10,
    borderRadius: 50,
  },
  
  tab: {
    
    backgroundColor: "#E6E6E6",
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 40,
    marginRight: 10,
    marginBottom: 10,
  },

  tabActive: { 
    backgroundColor: "#1B4332" 
  },

  tabText: { 
    fontSize: 20, 
    color: "#333" ,
    fontFamily: "AvenirNext-Medium"
  },

  tabTextActive: { 
    color: "#fff" 
  },

  tabsContainer: {
    marginTop: 20,
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#DDEEDC", 
    borderRadius: 25,
    padding: 5,
    marginBottom: 30,
    width: "100%",  
    alignSelf: "center",
  },

  plantImage: {
    width: "100%",
    height: 350,
    marginBottom: 20,
    borderRadius: 50,
    resizeMode: "contain",
    backgroundColor: "transparent", 
  },

  heartBtn: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 50,
    padding: 10,
    zIndex: 1,
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  plantName: {
    fontSize: 25,
    marginLeft: 20,
    fontWeight: "600",
    color: "#1B4332",
    fontFamily: "AvenirNext-Medium",
  },

  price: {
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#1B4332",
    marginTop: 4,
    fontFamily: "AvenirNext-Bold", 
  },

  arrowBtn: {
    backgroundColor: "#1B4332",
    marginRight: 20,
    width: 50,
    height: 50,
    borderRadius: 50,

    justifyContent: "center",
    alignItems: "center",
  },

  navContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,

    flexDirection: "row",
    justifyContent: "space-around",

    backgroundColor: "#1B4332",
    borderRadius: 50,
    padding: 15,
  },

  navItem: {
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  activeNavItem: {
    backgroundColor: "#fff",
  },
});
