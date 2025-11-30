import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailsScreen = ({ navigation, route }) => {
  const plant = route.params.plant; // 🌱 Get clicked plant

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    checkFavouriteStatus();
  }, []);

  const checkFavouriteStatus = async () => {
    const fav = await AsyncStorage.getItem("favorites");
    if (!fav) return;

    const favList = JSON.parse(fav);
    setIsFavourite(favList.some((p) => p.id === plant.id));
  };

  const toggleFavourite = async () => {
    const favData = await AsyncStorage.getItem("favorites");
    let favList = favData ? JSON.parse(favData) : [];

    let updatedFavs;

    if (favList.some((item) => item.id === plant.id)) {
      updatedFavs = favList.filter((item) => item.id !== plant.id);
      setIsFavourite(false);
    } else {
      updatedFavs = [...favList, plant];
      setIsFavourite(true);
    }

    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavs));
  };

  const addToCart = async () => {
    const cartData = await AsyncStorage.getItem("cart");
    let cartList = cartData ? JSON.parse(cartData) : [];

    cartList.push(plant);

    await AsyncStorage.setItem("cart", JSON.stringify(cartList));
    alert("Added to Cart!");
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerText}>Details</Text>

        <TouchableOpacity style={styles.heartCircle} onPress={toggleFavourite}>
          <Ionicons
            name={isFavourite ? "heart" : "heart-outline"}
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* IMAGE */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: plant.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* TITLE */}
      <View style={styles.titleContainer}>
        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.price}>{plant.price}</Text>
      </View>

      {/* RATING */}
      <Text style={styles.rating}>⭐ 4.9 (122 reviews)</Text>

      {/* DESCRIPTION */}
      <Text style={styles.description}>
        {plant.description
          ? plant.description
          : "A beautiful plant that fits well in any space..."}
        <Text style={styles.readMore}> Read More</Text>
      </Text>

      {/* INFO */}
      <Text style={styles.sectionTitle}>Plant Information</Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Category</Text>
          <Text style={styles.infoValue}>{plant.category}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Size</Text>
          <Text style={styles.infoValue}>{plant.size || "Medium"}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Humidity</Text>
          <Text style={styles.infoValue}>{plant.humidity || "75%"}</Text>
        </View>
      </View>

      {/* CART BUTTON */}
      <TouchableOpacity style={styles.cartButton} onPress={addToCart}>
        <Text style={styles.cartText}>Add To Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// ✔ SAME STYLES AS YOUR CODE (unchanged)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F5EC",
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1B4332",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 18,
    color: "white",
  },

  heartCircle: {
    width: 40,
    height: 40,
    backgroundColor: "#1B4332",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2f4f2f",
  },

  imageContainer: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#DDEEDC",
    borderRadius: 20,
    padding: 20,
  },

  image: {
    width: 200,
    height: 200,
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },

  plantName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#234d20",
  },

  price: {
    fontSize: 22,
    fontWeight: "700",
    color: "#234d20",
  },

  rating: {
    marginTop: 5,
    color: "#3d5c3d",
    fontSize: 14,
  },

  description: {
    marginTop: 10,
    color: "#2f4f2f",
    lineHeight: 20,
    fontSize: 14,
  },

  readMore: {
    color: "#2f8f2f",
    fontWeight: "500",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#234d20",
    marginTop: 20,
    marginBottom: 10,
  },

  infoContainer: {
    backgroundColor: "#DDEEDC",
    borderRadius: 15,
    padding: 15,
  },

  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  infoLabel: {
    color: "#3b5e3b",
    fontWeight: "500",
  },

  infoValue: {
    color: "#2f4f2f",
    fontWeight: "600",
  },

  cartButton: {
    backgroundColor: "#234d20",
    marginVertical: 30,
    marginBottom: 60,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
  },

  cartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DetailsScreen;
