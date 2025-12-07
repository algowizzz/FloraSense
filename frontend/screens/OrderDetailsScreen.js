import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";

export default function OrderDetailsScreen({ navigation, route }) {
  const { order } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: "#F0F5EC" }}>
      <View style={styles.greenHeader}>
        <TouchableOpacity
          style={{ position: "absolute", left: 20, top: 65 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Order Details</Text>
        <Text style={styles.headerSubtitle}>Order #{order.id}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>

          <View style={styles.cardBox}>
            {order.items.map((item) => {
              const cleanPrice = Number(item.price.replace(/[^0-9.]/g, ""));
              return (
                <View key={item.id} style={styles.orderRow}>
                  <Text style={styles.orderItemText}>
                    {item.name} × {item.qty}
                  </Text>
                  <Text style={styles.orderPriceText}>
                    ₹{(cleanPrice * item.qty).toFixed(2)}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <View style={styles.cardBox}>
            <Text style={styles.sectionText}>{order.address}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.cardBoxRow}>
            <Ionicons name="card" size={22} color="#1B4332" />
            <Text style={styles.sectionText}>{order.paymentMethod}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Date</Text>
          <View style={styles.cardBoxRow}>
            <Ionicons name="calendar" size={22} color="#1B4332" />
            <Text style={styles.sectionText}>
              {new Date(order.date).toDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Total Amount</Text>
          <View style={styles.cardBoxRow}>
            <Ionicons name="wallet" size={24} color="#1B4332" />
            <Text style={styles.totalAmount}>₹{order.total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <BottomNav activeNav="cart" navigation={navigation} />
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
  headerTitle: {
    color: "#f0f5ec",
    fontSize: 28,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#f0f5ec",
    fontSize: 16,
    opacity: 0.9,
    marginTop: 3,
  },

  section: {
    marginTop: 25,
    paddingHorizontal: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B4332",
    marginBottom: 10,
  },

  cardBox: {
    backgroundColor: "#ddeedc",
    padding: 15,
    borderRadius: 18,
  },
  cardBoxRow: {
    backgroundColor: "#ddeedc",
    padding: 15,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  sectionText: {
    fontSize: 15,
    color: "#1B4332",
  },

  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  orderItemText: {
    fontSize: 15,
    color: "#1B4332",
  },
  orderPriceText: {
    fontWeight: "600",
    color: "#1B4332",
  },

  totalAmount: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1B4332",
  },
});
