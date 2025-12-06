import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { plants } from "../../data/plant";
import BottomNav from "../components/BottomNav";
import { useIsFocused } from "@react-navigation/native";

const PlantCard = React.memo(({ item, isFav, toggleFavorite, navigation }) => (
  <View style={styles.card}>
    <TouchableOpacity
      style={styles.heartBtn}
      onPress={() => toggleFavorite(item)}
    >
      <Ionicons name={isFav ? "heart" : "heart-outline"} size={20} color="white" />
    </TouchableOpacity>

    <Image
      source={typeof item.image === "string" ? { uri: item.image } : item.image}
      style={styles.plantImage}
      resizeMode="contain"
    />

    <View style={styles.cardFooter}>
      <View>
        <Text style={styles.plantName}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>

      <TouchableOpacity
        style={styles.arrowBtn}
        onPress={() => navigation.navigate("Details", { plant: item })}
      >
        <Ionicons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>
    </View>
  </View>
));

export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) loadData();
  }, [isFocused]);

  const loadData = async () => {
    const fav = await AsyncStorage.getItem("favorites");
    if (fav) setFavorites(JSON.parse(fav));
  };

  const toggleFavorite = async (plant) => {
    try {
      const favData = await AsyncStorage.getItem("favorites");
      let favList = favData ? JSON.parse(favData) : [];

      if (favList.some((f) => f.id === plant.id)) {
        favList = favList.filter((f) => f.id !== plant.id);
      } else {
        favList.push(plant);
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favList));
      setFavorites(favList);
    } catch (e) {
      console.warn("toggleFavorite error", e);
    }
  };

  const categories = [
    "All",
    "Indoor",
    "Outdoor",
    "Succulents",
    "Flowering",
    "Herbs",
    "AirPurifiers",
  ];

  const filteredPlants =
    activeTab === "All" ? plants : plants.filter((p) => p.category === activeTab);

  const renderPlantCard = useCallback(
    ({ item }) => {
      const isFav = favorites.some((f) => f.id === item.id);
      return (
        <PlantCard
          item={item}
          isFav={isFav}
          toggleFavorite={toggleFavorite}
          navigation={navigation}
        />
      );
    },
    [favorites]
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Find Your{"\n"}
          <Text style={styles.highlight}>Favorite Plants</Text>
        </Text>

        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name="search" size={20} color="#1B4332" />
        </TouchableOpacity>
      </View>

      {/* TABS */}
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
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* PLANTS LIST */}
      <FlatList
        data={filteredPlants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPlantCard}
        showsVerticalScrollIndicator={false}
        initialNumToRender={8}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
        contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 20 }}
      />

      <BottomNav activeNav="home" navigation={navigation} isLoggedIn={isLoggedIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F5EC", paddingTop: 30, padding: 10 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 15,
    marginTop: 30,
    color: "#333",
    fontWeight: "400",
    fontFamily: "AvenirNext-Medium",
  },

  highlight: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1B4332",
    fontFamily: "AvenirNext-Bold",
  },

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
    marginBottom: 10,
  },

  tabActive: { backgroundColor: "#1B4332" },

  tabText: {
    fontSize: 15,
    color: "#333",
    fontFamily: "AvenirNext-Medium",
  },

  tabTextActive: { color: "#fff" },

  tabsContainer: { marginTop: 10, marginBottom: 5 },

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
    height: 250,
    marginBottom: 20,
    resizeMode: "contain",
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
    fontFamily: "AvenirNext-Medium",
  },

  price: {
    fontSize: 15,
    marginLeft: 20,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#1B4332",
    marginTop: 4,
    fontFamily: "AvenirNext-Bold",
  },

  arrowBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1B4332",
    alignItems: "center",
    justifyContent: "center",
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
    borderRadius: 40,
    padding: 10,
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
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  screenCenter: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },

  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1B4332",
    marginBottom: 20,
  },
});
