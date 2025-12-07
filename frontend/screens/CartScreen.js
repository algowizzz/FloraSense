import React, { useState, useEffect } from "react";
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
import { useIsFocused } from "@react-navigation/native";

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) loadCart();
  }, [isFocused]);

  const loadCart = async () => {
    const data = await AsyncStorage.getItem("cart");
    if (data) setCartItems(JSON.parse(data));
  };

  const saveCart = async (updatedCart) => {
    setCartItems(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
    );
    saveCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cartItems
      .map((item) =>
        item.id === id ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 0 } : item
      )
      .filter((item) => item.qty > 0);

    saveCart(updated);
  };

  const removeItem = (id) => {
    Alert.alert("Remove Item", "Do you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          const updated = cartItems.filter((it) => it.id !== id);
          saveCart(updated);
        },
      },
    ]);
  };

  const getTotal = () => {
    return cartItems.reduce((sum, it) => {
      const cleanPrice = Number(it.price.replace(/[^0-9.]/g, ""));
      return sum + cleanPrice * (it.qty || 1);
    }, 0);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F0F5EC" }}>
      <View style={styles.greenHeader}>
        <Text style={styles.greenHeaderTitle}>YOUR CART</Text>
        <Text style={styles.greenHeaderSubtitle}>
          Your Little Garden-in-the-Making
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 180 }}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty 🌿</Text>
        ) : (
          cartItems.map((item) => {
            const cleanPrice = Number(item.price.replace(/[^0-9.]/g, ""));
            const lineTotal = cleanPrice * (item.qty || 1);

            return (
              <View key={item.id} style={styles.card}>
                <Image
                  source={
                    typeof item.image === "string"
                      ? { uri: item.image }
                      : item.image
                  }
                  style={styles.image}
                />

                <View style={styles.details}>
                  <Text style={styles.plantName}>{item.name}</Text>
                  <Text style={styles.price}>₹{cleanPrice}</Text>

                  <Text style={styles.lineTotal}>Line Total: ₹{lineTotal}</Text>

                  <View style={styles.qtyContainer}>
                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() => decreaseQty(item.id)}
                    >
                      <Text style={styles.qtySymbol}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.qtyText}>{item.qty || 1}</Text>

                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() => increaseQty(item.id)}
                    >
                      <Text style={styles.qtySymbol}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeItem(item.id)}
                  >
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <View style={styles.totalBar}>
          <View>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{getTotal().toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => navigation.navigate("CheckoutScreen")}
          >
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}

      <BottomNav activeNav="cart" navigation={navigation} isLoggedIn={true} />
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
  },

  greenHeaderTitle: {
    color: "#f0f5ec",
    fontSize: 25,
    fontWeight: "bold",
  },
  
  greenHeaderSubtitle: {
    color: "#f0f5ec",
    fontSize: 15,
    marginTop: 5,
    opacity: 0.9,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#6B6B6B",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#ddeedc",
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

  details: {
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B4332",
    marginTop: 5,
  },

  lineTotal: {
    fontSize: 15,
    color: "#1B4332",
    marginTop: 5,
  },

  qtyContainer: {
    flexDirection: "row",
    backgroundColor: "#1B4332",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
    width: 120,
    height: 40,
    paddingHorizontal: 10,
    marginTop: 12,
  },

  qtyButton: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  qtySymbol: {
    color: "#f0f5ec",
    fontSize: 20,
    fontWeight: "bold",
  },

  qtyText: {
    color: "#f0f5ec",
    fontSize: 18,
    fontWeight: "700",
    width: 30,
    textAlign: "center",
  },

  removeButton: {
    marginTop: 10,
  },

  removeText: {
    color: "#1b4332",
    fontWeight: "600",
  },

  totalBar: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    backgroundColor: "#F0F5EC",
    paddingVertical: 20,
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 16,
    color: "#6B6B6B",
  },

  totalValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1B4332",
  },

  checkoutBtn: {
    backgroundColor: "#1B4332",
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 10,
  },

  checkoutText: {
    color: "#f0f5ec",
    fontSize: 17,
    fontWeight: "bold",
  },
});
