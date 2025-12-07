import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNav from "../components/BottomNav";

export default function MyOrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await AsyncStorage.getItem("orders");
    setOrders(data ? JSON.parse(data) : []);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F0F5EC" }}>
      <View style={styles.greenHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
        <Text style={styles.greenHeaderTitle}>MY ORDERS</Text>
        <Text style={styles.greenHeaderSubtitle}>Your complete order history</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {orders.length === 0 ? (
          <Text style={styles.emptyText}>No orders placed yet 🌱</Text>
        ) : (
          orders.map((order, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.orderTitle}>Order #{index + 1}</Text>
              <Text style={styles.orderText}>Items: {order.items.length}</Text>
              <Text style={styles.orderText}>Total: ₹{order.total}</Text>
              <Text style={styles.orderDate}>Placed on: {order.date}</Text>

              <TouchableOpacity
                style={styles.viewBtn}
                onPress={() => navigation.navigate("OrderDetailsScreen", { order })}
              >
                <Text style={styles.viewText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <BottomNav activeNav="person" navigation={navigation} isLoggedIn={true} />
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
    position: "relative",
  },

  backBtn: { position: "absolute", top: 70, left: 20 },
  greenHeaderTitle: { color: "#f0f5ec", fontSize: 26, fontWeight: "800" },
  greenHeaderSubtitle: { color: "#f0f5ec", opacity: 0.8, marginTop: 5 },

  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#6B6B6B",
  },

  card: {
    backgroundColor: "#ddeedc",
    marginHorizontal: 22,
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 2,
  },

  orderTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B4332",
  },

  orderText: {
    fontSize: 15,
    color: "#1b4332de",
    marginTop: 5,
  },

  orderDate: {
    marginTop: 5,
    fontSize: 14,
    color: "#6B6B6B",
  },

  viewBtn: {
    marginTop: 12,
    backgroundColor: "#1B4332",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  viewText: { color: "#f0f5ec", fontWeight: "700", fontSize: 15 },
});
