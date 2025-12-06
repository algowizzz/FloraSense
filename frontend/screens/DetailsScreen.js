import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const DetailsScreen = ({ navigation, route }) => {
  const plant = route.params.plant;
  const [isFavourite, setIsFavourite] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastOpacity] = useState(new Animated.Value(0));

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) checkFavouriteStatus();
  }, [isFocused]);

  const showToast = (msg) => {
    setToastMsg(msg);

    Animated.timing(toastOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(toastOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 10000); // 10 seconds
  };

  const checkFavouriteStatus = async () => {
    const fav = await AsyncStorage.getItem("favorites");
    const favList = fav ? JSON.parse(fav) : [];
    setIsFavourite(favList.some((p) => p.id === plant.id));
  };

  const toggleFavourite = async () => {
    const favData = await AsyncStorage.getItem("favorites");
    let favList = favData ? JSON.parse(favData) : [];

    if (favList.some((item) => item.id === plant.id)) {
      favList = favList.filter((item) => item.id !== plant.id);
      setIsFavourite(false);
      showToast("Removed from Favourites ❤️");
    } else {
      favList.push(plant);
      setIsFavourite(true);
      showToast("Added to Favourites 🌿");
    }

    await AsyncStorage.setItem("favorites", JSON.stringify(favList));
  };

  const addToCart = async () => {
    const cartData = await AsyncStorage.getItem("cart");
    let cartList = cartData ? JSON.parse(cartData) : [];

    const existing = cartList.find((item) => item.id === plant.id);

    if (existing) {
      const updated = cartList.map((item) =>
        item.id === plant.id ? { ...item, qty: (item.qty || 1) + 1 } : item
      );
      await AsyncStorage.setItem("cart", JSON.stringify(updated));
      showToast("Increased Quantity in Cart 🛒");
    } else {
      cartList.push({ ...plant, qty: 1 });
      await AsyncStorage.setItem("cart", JSON.stringify(cartList));
      showToast("Added to Cart 🛒");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Custom Toast */}
      <Animated.View
        style={[
          styles.toastContainer,
          { opacity: toastOpacity },
        ]}
      >
        <Text style={styles.toastText}>{toastMsg}</Text>
      </Animated.View>

      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.circleButton} onPress={() => navigation.goBack()}>
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

        <View style={styles.imageContainer}>
          <Image
            source={typeof plant.image === "string" ? { uri: plant.image } : plant.image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.plantName}>{plant.name}</Text>
          <Text style={styles.price}>{plant.price}</Text>
        </View>

        <Text style={styles.rating}>⭐ 4.9 (122 reviews)</Text>

        <Text style={styles.description}>
          {plant.description || "A beautiful plant that fits well in any space..."}
          <Text style={styles.readMore}> Read More</Text>
        </Text>

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

        <TouchableOpacity style={styles.cartButton} onPress={addToCart}>
          <Text style={styles.cartText}>Add To Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: "#1B4332",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    position: "absolute",
    top: 60, // EXACTLY as you requested
    alignSelf: "center",
    zIndex: 999,
  },
  toastText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

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
  },

  description: {
    marginTop: 10,
    color: "#2f4f2f",
    lineHeight: 20,
  },

  readMore: {
    color: "#2f8f2f",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
  },

  infoContainer: {
    backgroundColor: "#DDEEDC",
    padding: 15,
    borderRadius: 15,
  },

  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  infoLabel: {
    color: "#3b5e3b",
  },

  infoValue: {
    color: "#2f4f2f",
  },

  cartButton: {
    backgroundColor: "#234d20",
    marginTop: 30,
    marginBottom: 60,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
  },

  cartText: {
    color: "white",
    fontSize: 16,
  },
});

export default DetailsScreen;
