import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";

export default function HelpContactScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#F0F5EC" }}>
      <View style={styles.greenHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#f0f5ec" />
        </TouchableOpacity>
        <Text style={styles.greenHeaderTitle}>HELP & CONTACT</Text>
        <Text style={styles.greenHeaderSubtitle}>We're here to support you!</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Frequently Asked</Text>
          <Text style={styles.faq}>• How to track my order?</Text>
          <Text style={styles.faq}>• How to contact support?</Text>
          <Text style={styles.faq}>• How to return a product?</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contact Us</Text>

          <TouchableOpacity
            style={styles.contactBtn}
            onPress={() => Linking.openURL("mailto:support@florasense.com")}
          >
            <Ionicons name="mail" size={22} color="#f0f5ec" />
            <Text style={styles.contactText}> Email Support</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactBtn}
            onPress={() => Linking.openURL("tel:+919951335335")}
          >
            <Ionicons name="call" size={22} color="#f0f5ec" />
            <Text style={styles.contactText}> Call Us</Text>
          </TouchableOpacity>
        </View>
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

  card: {
    backgroundColor: "#ddeedc",
    marginHorizontal: 22,
    marginTop: 25,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1B4332",
    marginBottom: 10,
  },

  faq: {
    fontSize: 15,
    color: "#4F6F52",
    marginVertical: 5,
  },

  contactBtn: {
    backgroundColor: "#1B4332",
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  contactText: {
    color: "#f0f5ec",
    fontSize: 16,
    fontWeight: "700",
  },
});
