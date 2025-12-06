import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNav from "../components/BottomNav";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

export default function FavouriteScreen({ navigation }) {
  const [favourites, setFavourites] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) loadFavourites();
  }, [isFocused]);

  const loadFavourites = async () => {
    const fav = await AsyncStorage.getItem("favorites");
    setFavourites(fav ? JSON.parse(fav) : []);
  };

  const removeFavourite = async (id) => {
    Alert.alert("Remove Favourite", "Do you want to remove this plant?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          const updated = favourites.filter((item) => item.id !== id);
          await AsyncStorage.setItem("favorites", JSON.stringify(updated));
          setFavourites(updated);
        },
      },
    ]);
  };

  const addToCart = async (item) => {
    const cartData = await AsyncStorage.getItem("cart");
    let cartList = cartData ? JSON.parse(cartData) : [];

    const existing = cartList.find((it) => it.id === item.id);

    if (existing) {
      const updated = cartList.map((it) =>
        it.id === item.id ? { ...it, qty: (it.qty || 1) + 1 } : it
      );
      await AsyncStorage.setItem("cart", JSON.stringify(updated));
      Alert.alert("Updated", "Quantity increased in cart");
    } else {
      cartList.push({ ...item, qty: 1 });
      await AsyncStorage.setItem("cart", JSON.stringify(cartList));
      Alert.alert("Added", "Added to cart!");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F0F5EC" }}>

      {/* 💚 Curved Green Header */}
      <View style={styles.greenHeader}>
        <Text style={styles.greenHeaderTitle}>YOUR FAVOURITES</Text>
        <Text style={styles.greenHeaderSubtitle}>
          Plants You Love the Most 🌿
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
        {favourites.length === 0 ? (
          <Text style={styles.emptyText}>No favourite plants yet.</Text>
        ) : (
          favourites.map((item) => (
            <View key={item.id} style={styles.card}>
              {/* 🌱 Image */}
              <Image
                source={
                  typeof item.image === "string"
                    ? { uri: item.image }
                    : item.image
                }
                style={styles.image}
              />

              {/* 🌱 Details */}
              <View style={styles.infoContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Details", { plant: item })}>
                  <Text style={styles.plantName}>{item.name}</Text>
                </TouchableOpacity>

                <Text style={styles.price}>{item.price}</Text>

                {/* 🔘 Buttons Row */}
                <View style={styles.buttonsRow}>
                  
                  {/* Remove Button */}
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeFavourite(item.id)}
                  >
                    <Ionicons name="trash-outline" size={18} color="white" />
                  </TouchableOpacity>

                  {/* Add to Cart */}
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => addToCart(item)}
                  >
                    <Ionicons name="cart" size={16} color="#1B4332" />
                    <Text style={styles.addBtnText}>Add to Cart</Text>
                  </TouchableOpacity>

                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <BottomNav activeNav="heart" navigation={navigation} isLoggedIn={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  /* 💚 Header Styling */
  greenHeader: {
    width: "100%",
    backgroundColor: "#1B4332",
    paddingTop: 70,
    paddingBottom: 55,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    alignItems: "center",
  },

  greenHeaderTitle: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },

  greenHeaderSubtitle: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
    opacity: 0.9,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#6B6B6B",
  },

  /* 💚 Cards Same as Cart */
  card: {
    flexDirection: "row",
    backgroundColor: "#E8F5E9",
    marginHorizontal: 22,
    marginVertical: 14,
    padding: 16,
    borderRadius: 18,
  },

  image: {
    width: 110,
    height: 110,
    borderRadius: 16,
  },

  infoContainer: {
    marginLeft: 18,
    flex: 1,
    justifyContent: "center",
  },

  plantName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B4332",
  },

  price: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B4332",
  },

  /* Buttons Row */
  buttonsRow: {
    flexDirection: "row",
    marginTop: 14,
    alignItems: "center",
  },

  removeBtn: {
    backgroundColor: "#8A1C1C",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  addBtn: {
    marginLeft: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1B4332",
  },

  addBtnText: {
    marginLeft: 6,
    color: "#1B4332",
    fontWeight: "700",
  },
});
