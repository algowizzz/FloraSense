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

const FavCard = React.memo(({ item, removeFav }) => (
  <View style={styles.card}>
    <TouchableOpacity style={styles.heartBtn} onPress={() => removeFav(item)}>
      <Ionicons name="trash" size={20} color="white" />
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
    </View>
  </View>
));

const CartCard = React.memo(({ item, updateQty, removeCart }) => (
  <View style={styles.card}>
    <TouchableOpacity style={styles.heartBtn} onPress={() => removeCart(item)}>
      <Ionicons name="trash" size={20} color="white" />
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

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => updateQty(item, "dec")}
            style={{ padding: 10, backgroundColor: "#1B4332", borderRadius: 10 }}
          >
            <Ionicons name="remove" size={18} color="white" />
          </TouchableOpacity>

          <Text style={{ fontSize: 16, marginHorizontal: 15, color: "#1B4332" }}>
            {item.qty}
          </Text>

          <TouchableOpacity
            onPress={() => updateQty(item, "inc")}
            style={{ padding: 10, backgroundColor: "#1B4332", borderRadius: 10 }}
          >
            <Ionicons name="add" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
));

export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("All");
  const [activeNav, setActiveNav] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const fav = await AsyncStorage.getItem("favorites");
    const crt = await AsyncStorage.getItem("cart");

    if (fav) setFavorites(JSON.parse(fav));
    if (crt) setCart(JSON.parse(crt));
  };

  const toggleFavorite = async (plant) => {
    let updated;

    if (favorites.some((f) => f.id === plant.id)) {
      updated = favorites.filter((f) => f.id !== plant.id);
    } else {
      updated = [...favorites, plant];
    }

    setFavorites(updated);
    await AsyncStorage.setItem("favorites", JSON.stringify(updated));
  };

  const removeFav = async (plant) => {
    const updated = favorites.filter((f) => f.id !== plant.id);
    setFavorites(updated);
    await AsyncStorage.setItem("favorites", JSON.stringify(updated));
  };

  const addToCart = async (plant) => {
    let updated = [...cart];

    const existing = updated.find((c) => c.id === plant.id);

    if (existing) existing.qty += 1;
    else updated.push({ ...plant, qty: 1 });

    setCart(updated);
    await AsyncStorage.setItem("cart", JSON.stringify(updated));
  };

  const updateQty = async (plant, type) => {
    let updated = [...cart];

    const item = updated.find((c) => c.id === plant.id);

    if (!item) return;

    if (type === "inc") item.qty += 1;
    if (type === "dec") item.qty -= 1;

    if (item.qty <= 0) updated = updated.filter((c) => c.id !== plant.id);

    setCart(updated);
    await AsyncStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeCart = async (plant) => {
    const updated = cart.filter((c) => c.id !== plant.id);
    setCart(updated);
    await AsyncStorage.setItem("cart", JSON.stringify(updated));
  };

  const filteredPlants =
    activeTab === "All" ? plants : plants.filter((p) => p.category === activeTab);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Find Your {"\n"}
          <Text style={styles.highlight}>Favorite Plants</Text>
        </Text>

        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name="search" size={20} color="#1B4332" />
        </TouchableOpacity>
      </View>

      {activeNav === "home" && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
          {["All", "Indoor", "Outdoor", "Succulents", "Flowering", "Herbs", "AirPurifiers"].map(
            (tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.tabActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      )}

      {activeNav === "home" && (
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PlantCard
              item={item}
              isFav={favorites.some((f) => f.id === item.id)}
              toggleFavorite={toggleFavorite}
              navigation={navigation}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 20 }}
        />
      )}

      {activeNav === "heart" && (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FavCard item={item} removeFav={removeFav} />}
          ListHeaderComponent={<Text style={styles.screenTitle}>❤️ Favourites</Text>}
          contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 20 }}
        />
      )}

      {activeNav === "cart" && (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CartCard item={item} updateQty={updateQty} removeCart={removeCart} />
          )}
          ListHeaderComponent={<Text style={styles.screenTitle}>🛒 Cart</Text>}
          contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 20 }}
        />
      )}

      {activeNav === "person" && (
        <View style={styles.screenCenter}>
          <Text style={styles.screenTitle}>👤 Profile</Text>
        </View>
      )}

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
  },

  highlight: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1B4332",
  },

  searchBtn: {
    backgroundColor: "#DDEEDC",
    marginTop: 30,
    padding: 10,
    borderRadius: 50,
  },

  tabsContainer: { marginTop: 10, marginBottom: 5 },

  tab: {
    backgroundColor: "#E6E6E6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    marginRight: 10,
  },

  tabActive: { backgroundColor: "#1B4332" },

  tabText: { color: "#333" },

  tabTextActive: { color: "#fff" },

  card: {
    backgroundColor: "#DDEEDC",
    borderRadius: 25,
    padding: 5,
    marginBottom: 30,
    width: "100%",
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
    color: "#1B4332",
    marginTop: 4,
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
  },

  screenTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#1B4332",
    marginVertical: 20,
    alignSelf: "center",
  },
});
