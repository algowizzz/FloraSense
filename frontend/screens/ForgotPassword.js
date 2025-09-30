// // screens/ForgotPasswordScreen.js
// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { Appbar, Button } from "react-native-paper";

// export default function ForgotPasswordScreen({ navigation }) {
//   const [email, setEmail] = useState("");

//   return (
//     <View style={styles.container}>
//         {/* Back Button */}
//         <Appbar.Header style={styles.appbar}>
//           <Appbar.BackAction onPress={() => navigation.navigate("Login")} />
//         </Appbar.Header>

//       <View style={styles.content}>
//         <Text style={styles.title}>Forgot Password?</Text>
//         <Text style={styles.subtitle}>
//           Don’t worry! Just enter your email and we’ll send you a reset link.
//         </Text>

//       {/* Email Input */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           placeholder="Email"
//           placeholderTextColor="#777"
//           style={styles.input}
//           value={email}
//           onChangeText={setEmail}
//         />
//         <View style={styles.iconWrapper}>
//           <Ionicons name="mail-outline" size={22} color="#555" />
//         </View>
//       </View>

//       {/* Reset Button */}
//       <Button
//         mode="contained"
//         style={styles.resetBtn}    
//         labelStyle={styles.resetText} 
//       >Send Reset Link
//       </Button>

//       {/* Back to Login */}
//       <Text style={styles.footer}>
//         Remembered your password?{" "}
//         <Text
//           style={styles.link}
//           onPress={() => navigation.navigate("Login")}
//         >
//           Back to Login
//         </Text>
//       </Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//   flex: 1,
//   backgroundColor: "#eef2e6",
//   },
//   appbar: {
//     backgroundColor: "transparent",
//     elevation: 0,
//   },
//   content: {
//     flex: 1,
//     marginTop: 130,
//     padding: 40,
//   },
//   backBtn: {
//     position: "absolute",
//     top: 50,
//     left: 20,
//   },
//   title: {
//     fontSize: 40,
//     fontFamily: "AvenirNext-Bold",
//     fontWeight: "bold",
//     color: "#2d4a22",
//     marginBottom: 20,
//     marginRight: "auto",
//   },
//   subtitle: {
//     fontFamily: "AvenirNext-Regular",
//     fontSize: 15,
//     color: "#555",
//     textAlign: "center",
//     marginBottom: 25,
//     lineHeight: 20,
//   },
//   inputContainer: {
//     width: "100%",
//     backgroundColor: "#e3e8da",
//     borderRadius: 25,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     marginBottom: 15,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   input: {
//     flex: 1,
//     fontSize: 15,
//     fontFamily: "AvenirNext-Regular",
//   },
//   iconWrapper: {
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   resetBtn: {
//     marginTop: 15,
//     width: "100%",
//     backgroundColor: "#2d6a4f",
//     paddingVertical: 14,
//     borderRadius: 30,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   resetText: {
//     fontSize: 30, 
//     fontWeight: "bold",
//     color: "#fff",
//     fontFamily: "AvenirNext-Bold",
//     fontSize: 18,
//   },
//   footer: {
//     fontFamily: "AvenirNext-Regular",
//     fontSize: 15,
//     marginTop: 10,
//   },
//   link: {
//     fontFamily: "AvenirNext-Medium",
//     fontSize: 15,
//     color: "#2d6a4f",
//     fontWeight: "500",
//   },
// });


// screens/ForgotPasswordScreen.js
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      {/* Back Button (absolute top-left) */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.navigate("Login")}
      >
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Don’t worry! Just enter your email and we’ll send you a reset link.
      </Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#777"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.iconWrapper}>
          <Ionicons name="mail-outline" size={22} color="#555" />
        </View>
      </View>

      {/* Reset Button */}
      <Button
        mode="contained"
        style={styles.resetBtn}
        labelStyle={styles.resetText}
      >
        Send Reset Link
      </Button>

      {/* Back to Login */}
      <Text style={styles.footer}>
        Remembered your password?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Back to Login
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2e6",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  backBtn: {
    position: "absolute",
    top: 50, // adjust for notch
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 40,
    fontFamily: "AvenirNext-Bold",
    fontWeight: "bold",
    color: "#2d4a22",
    marginBottom: 20,
    marginRight: "auto",
  },
  subtitle: {
    fontFamily: "AvenirNext-Regular",
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 20,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#e3e8da",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: "AvenirNext-Regular",
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  resetBtn: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#2d6a4f",
    paddingVertical: 13,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  resetText: {
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "AvenirNext-Bold",
    fontSize: 18, 
  },
  footer: {
    fontFamily: "AvenirNext-Regular",
    fontSize: 15,
    marginTop: 10,
  },
  link: {
    fontFamily: "AvenirNext-Medium",
    fontSize: 15,
    color: "#2d6a4f",
    fontWeight: "500",
  },
});
