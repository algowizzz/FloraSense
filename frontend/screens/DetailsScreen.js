import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";

const DetailsScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerText}>Details</Text>

        <TouchableOpacity style={styles.heartCircle}>
          <Ionicons name="heart-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: "https://i.ibb.co/5R0Q6mC/monstera.png" }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.plantName}>Monstera Deliciosa</Text>
        <Text style={styles.price}>$99</Text>
      </View>

      <Text style={styles.rating}>⭐ 4.9 (122 reviews)</Text>

      <Text style={styles.description}>
        Monstera deliciosa, the Swiss cheese plant or split-leaf philodendron, is a species of
        flowering plant native to tropical forests of southern Mexico, south to Panama. It has
        been...
        <Text style={styles.readMore}> Read More</Text>
      </Text>

      {/* Plant Info */}
      <Text style={styles.sectionTitle}>Plant Information</Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Category</Text>
          <Text style={styles.infoValue}>Indoor</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Plant</Text>
          <Text style={styles.infoValue}>Orchid</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Size</Text>
          <Text style={styles.infoValue}>Medium</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Height</Text>
          <Text style={styles.infoValue}>16.9”</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Humidity</Text>
          <Text style={styles.infoValue}>92%</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cartButton}>
        <Text style={styles.cartText}>Add To Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

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
