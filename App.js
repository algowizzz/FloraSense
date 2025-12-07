import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import WelcomeScreen from './frontend/screens/WelcomeScreen';
import LoginScreen from './frontend/screens/LoginScreen';
import SignupScreen from './frontend/screens/SignupScreen';
import HomeScreen from './frontend/screens/HomeScreen';
import ForgotPasswordScreen from "./frontend/screens/ForgotPassword";
import AccountScreen from "./frontend/screens/AccountScreen";
import DetailsScreen from "./frontend/screens/DetailsScreen";
import FavouriteScreen from "./frontend/screens/FavouriteScreen";
import CartScreen from "./frontend/screens/CartScreen";
import MyOrdersScreen from "./frontend/screens/MyOrdersScreen";
import OrderDetailsScreen from "./frontend/screens/OrderDetailsScreen";
import EditProfileScreen from "./frontend/screens/EditProfileScreen";
import SettingsScreen from "./frontend/screens/SettingsScreen";
import HelpContactScreen from "./frontend/screens/HelpContactScreen";
import CheckoutScreen from "./frontend/screens/CheckoutScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
        />
        <Stack.Screen
          name="FavouriteScreen"
          component={FavouriteScreen}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
        />
        <Stack.Screen
          name="MyOrdersScreen"
          component={MyOrdersScreen}
        />
        <Stack.Screen
          name="OrderDetailsScreen"
          component={OrderDetailsScreen}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
        />
        <Stack.Screen
          name="HelpContactScreen"
          component={HelpContactScreen}
        />
        <Stack.Screen
          name="CheckoutScreen"
          component={CheckoutScreen}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
