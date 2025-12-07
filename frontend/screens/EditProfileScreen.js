import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { getCurrentUser, updateUserProfile } from "../utils/auth";

export default function EditProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const current = await getCurrentUser();
    if (current) {
      setUser(current);
      setFirstName(current.firstName || "");
      setLastName(current.lastName || "");
      setGender(current.gender || "");
      setPhone(current.phone || "");
      setBirthdate(current.birthdate ? new Date(current.birthdate) : null);
    }
  };

  const saveProfile = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      alert("Please enter your first and last name.");
      return;
    }

    const updatedUser = {
      ...user,
      firstName,
      lastName,
      gender,
      phone,
      birthdate: birthdate ? birthdate.toISOString() : "",
    };

    const result = await updateUserProfile(updatedUser);
    if (result.success) {
      alert("Profile updated!");
      navigation.goBack();
    } else alert("Failed to update profile.");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F0F5EC" }}>
      <View style={styles.greenHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>

        <Text style={styles.greenHeaderTitle}>EDIT PROFILE</Text>
        <Text style={styles.greenHeaderSubtitle}>Update your personal details</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>

        <View style={styles.card}>
          
          <Text style={styles.label}>First Name</Text>
          <TextInput
            placeholder="Enter first name"
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            placeholder="Enter last name"
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />

          <Text style={styles.label}>Email (Read Only)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: "#E7EFE7", color: "#666" }]}
            editable={false}
            value={user?.email || ""}
          />

          <Text style={styles.label}>Gender</Text>
          <TextInput
            placeholder="Enter gender"
            style={styles.input}
            value={gender}
            onChangeText={setGender}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            placeholder="Enter phone number"
            style={styles.input}
            keyboardType="number-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.label}>Birthdate</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {birthdate ? birthdate.toDateString() : "Select Birthdate"}
            </Text>
            <Ionicons name="calendar-outline" size={20} color="#1B4332" />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={birthdate || new Date()}
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => {
                setShowDatePicker(Platform.OS === "ios");
                if (selectedDate) setBirthdate(selectedDate);
              }}
            />
          )}
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
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

  backBtn: {
    position: "absolute",
    top: 70,
    left: 20,
  },

  greenHeaderTitle: {
    color: "#f0f5ec",
    fontSize: 26,
    fontWeight: "800",
  },

  greenHeaderSubtitle: {
    color: "#f0f5ec",
    fontSize: 15,
    marginTop: 4,
    opacity: 0.9,
  },

  card: {
    backgroundColor: "#ddeedc",
    marginHorizontal: 22,
    marginTop: 30,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1B4332",
    marginTop: 10,
  },

  input: {
    marginTop: 6,
    backgroundColor: "#f0f5ec",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    color: "#1B4332",
  },

  dateInput: {
    marginTop: 6,
    backgroundColor: "#f0f5ec",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 15,
    color: "#1B4332",
  },

  saveBtn: {
    backgroundColor: "#1B4332",
    paddingVertical: 16,
    marginHorizontal: 22,
    borderRadius: 12,
    marginTop: 30,
    alignItems: "center",
  },
  saveText: {
    color: "#f0f5ec",
    fontSize: 18,
    fontWeight: "700",
  },
});
