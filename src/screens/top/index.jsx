import React from "react";
import HomeScreen from "../home/index";
import SearchScreen from "../search/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function TopScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "#706fd3" },
        headerTintColor: "white",
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}

const Tab = createBottomTabNavigator();
