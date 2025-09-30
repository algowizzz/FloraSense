import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Card, IconButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [active, setActive] = useState("home"); // <-- add this

  return (
    <View style={styles.container}>
      {/* Header Title + Search */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Find Your{"\n"}
          <Text style={styles.highlight}>Favorite Plants</Text>
        </Text>
        <IconButton
          icon="magnify"
          size={40}
          style={styles.searchBtn}
          iconColor="#2F4F1C"
        />
      </View>

      {/* Category Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.tabActive]}>
          <Text style={[styles.tabText, { color: "white" }]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Indoor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Outdoor</Text>
        </TouchableOpacity>
      </View>

      {/* Plant Cards */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card style={styles.card}>
          <Card.Content>
            <Image
              source={{
                uri: "https://pngimg.com/uploads/monstera/monstera_PNG24.png",
              }}
              style={styles.plantImage}
              resizeMode="contain"
            />

            {/* Heart Button */}
            <IconButton
              icon="heart-outline"
              size={20}
              style={styles.heartBtn}
              iconColor="#2F4F1C"
            />

            {/* Plant Name + Price */}
            <Text style={styles.plantName}>Monstera Deliciosa</Text>
            <Text style={styles.price}>$99</Text>

            {/* Arrow Button */}
            <TouchableOpacity style={styles.arrowBtn}>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.navContainer}>
        {/* Home */}
        <TouchableOpacity
          style={[styles.navItem, active === "home" && styles.activeItem]}
          onPress={() => setActive("home")}
        >
          <Ionicons
            name="home"
            size={28}
            color={active === "home" ? "#2D6A4F" : "#A8D5BA"}
          />
        </TouchableOpacity>

        {/* Cart */}
        <TouchableOpacity
          style={[styles.navItem, active === "cart" && styles.activeItem]}
          onPress={() => setActive("cart")}
        >
          <Ionicons
            name="cart"
            size={28}
            color={active === "cart" ? "#2D6A4F" : "#A8D5BA"}
          />
        </TouchableOpacity>

        {/* Favorites */}
        <TouchableOpacity
          style={[styles.navItem, active === "heart" && styles.activeItem]}
          onPress={() => setActive("heart")}
        >
          <Ionicons
            name="heart-outline"
            size={28}
            color={active === "heart" ? "#2D6A4F" : "#A8D5BA"}
          />
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity
          style={[styles.navItem, active === "person" && styles.activeItem]}
          onPress={() => setActive("person")}
        >
          <Ionicons
            name="person-outline"
            size={28}
            color={active === "person" ? "#2D6A4F" : "#A8D5BA"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5EC",
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "#333",
  },
  highlight: {
    color: "#2F4F1C",
    fontWeight: "700",
    fontSize: 40,
  },
  searchBtn: {
    backgroundColor: "#DDE7D1",
  },
  tabs: {
    flexDirection: "row",
    marginVertical: 20,
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: "#E6E6E6",
  },
  tabActive: {
    backgroundColor: "#2F4F1C",
  },
  tabText: {
    fontSize: 25,
    fontFamily: "AvenirNext-Medium",
    color: "#333",
  },
  card: {
    backgroundColor: "#DDE7D1",
    borderRadius: 20,
    marginBottom: 20,
    padding: 10,
  },
  plantImage: {
    width: "100%",
    height: 150,
  },
  heartBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "white",
  },
  plantName: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    color: "#333",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
  },
  arrowBtn: {
    backgroundColor: "#2F4F1C",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1B4332",
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  activeItem: {
    backgroundColor: "#FFFFFF",
  },
});
