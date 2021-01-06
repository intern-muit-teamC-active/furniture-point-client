import React from "react";
import HomeScreen from "../home/index";
import SearchStackScreens from "../search/stacks";
import QRScreen from "../qr/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

export default function TopScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "ios-search" : "ios-search-outline";
          } else if (route.name === "QR") {
            iconName = focused ? "ios-qr-scanner" : "ios-qr-scanner-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerStyle: { backgroundColor: "#706fd3" },
        headerTintColor: "white",
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchStackScreens} />
      <Tab.Screen name="QR" component={QRScreen} />
    </Tab.Navigator>
  );
}

const Tab = createBottomTabNavigator();
