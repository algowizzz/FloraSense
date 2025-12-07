import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNav from "../components/BottomNav";
import { Ionicons } from "@expo/vector-icons";

export default function CheckoutScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("H.No 123, Green Street, Hyderabad");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [editVisible, setEditVisible] = useState(false);
  const [tempAddress, setTempAddress] = useState("");

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const data = await AsyncStorage.getItem("cart");
    if (data) setCartItems(JSON.parse(data));
  };

  const getTotal = () => {
    return cartItems.reduce((sum, it) => {
      const price = Number(it.price.replace(/[^0-9.]/g, ""));
      return sum + price * (it.qty || 1);
    }, 0);
  };

  const placeOrder = async () => {
    const existingOrders =
      JSON.parse(await AsyncStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: getTotal(),
      paymentMethod,
      address,
      date: new Date().toISOString(),
    };

    existingOrders.push(newOrder);

    await AsyncStorage.setItem("orders", JSON.stringify(existingOrders));
    await AsyncStorage.removeItem("cart");

    navigation.replace("MyOrdersScreen");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F0F5EC" }}>
      <View style={styles.greenHeader}>
        <Text style={styles.headerTitle}>Checkout</Text>
        <Text style={styles.headerSubtitle}>Complete Your Purchase 🌿</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <View style={styles.cardBox}>
            <Text style={styles.sectionText}>{address}</Text>

            <TouchableOpacity
              onPress={() => {
                setTempAddress(address);
                setEditVisible(true);
              }}
            >
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          <View style={styles.cardBox}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.orderRow}>
                <Text style={styles.orderItemText}>
                  {item.name} × {item.qty}
                </Text>
                <Text style={styles.orderPriceText}>
                  ₹{(
                    Number(item.price.replace(/[^0-9.]/g, "")) * item.qty
                  ).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery</Text>

          <View style={styles.cardBoxRow}>
            <Ionicons name="bicycle" size={22} color="#1B4332" />
            <Text style={styles.sectionText}>Standard Delivery (2–4 days)</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setPaymentMethod("COD")}
          >
            <Ionicons
              name={paymentMethod === "COD" ? "radio-button-on" : "radio-button-off"}
              size={22}
              color="#1B4332"
            />
            <Text style={styles.paymentText}>Cash on Delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setPaymentMethod("Card")}
          >
            <Ionicons
              name={paymentMethod === "Card" ? "radio-button-on" : "radio-button-off"}
              size={22}
              color="#1B4332"
            />
            <Text style={styles.paymentText}>Credit / Debit Card</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.totalBar}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹{getTotal().toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.placeOrderBtn} onPress={placeOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={editVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Edit Address</Text>

            <TextInput
              style={styles.modalInput}
              value={tempAddress}
              onChangeText={setTempAddress}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setEditVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalSave}
                onPress={() => {
                  setAddress(tempAddress);
                  setEditVisible(false);
                }}
              >
                <Text style={styles.modalSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <BottomNav activeNav="cart" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  greenHeader: {
    width: "100%",
    backgroundColor: "#1B4332",
    paddingTop: 60,
    paddingBottom: 50,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    alignItems: "center",
  },

  headerTitle: {
    color: "#f0f5ec",
    fontSize: 26,
    fontWeight: "bold",
  },

  headerSubtitle: {
    color: "#f0f5ec",
    opacity: 0.9,
    marginTop: 5,
    opacity: 0.9,
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

  editText: {
    marginTop: 10,
    color: "#1B4332",
    fontWeight: "600",
  },

  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  orderItemText: {
    color: "#1B4332",
    fontSize: 15,
  },

  orderPriceText: {
    fontWeight: "600",
    color: "#1B4332",
  },

  paymentOption: {
    backgroundColor: "#ddeedc",
    padding: 15,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 15,
  },

  paymentText: {
    color: "#1B4332",
    fontSize: 16,
  },

  totalBar: {
    position: "absolute",
    bottom: 105,
    left: 0,
    right: 0,
    paddingVertical: 8,
    paddingHorizontal: 22,
    backgroundColor: "#F0F5EC",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 15,
    color: "#555",
  },
  
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1B4332",
  },

  placeOrderBtn: {
    backgroundColor: "#1B4332",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  placeOrderText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "85%",
    backgroundColor: "#ddeedc",
    padding: 20,
    borderRadius: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B4332",
    marginBottom: 15,
  },

  modalInput: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    minHeight: 80,
    textAlignVertical: "top",
    fontSize: 15,
    color: "#1B4332",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
  },

  modalCancelText: {
    color: "#555",
    fontSize: 16,
    marginRight: 10,
  },

  modalSave: {
    backgroundColor: "#1B4332",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  modalSaveText: {
    color: "#f0f5ec",
    fontWeight: "700",
    fontSize: 16,
  },
});
