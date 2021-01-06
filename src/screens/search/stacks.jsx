import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./index";
import ProductScreen from "../product/index";
import MapScreen from "../top/index";

export default function SearchStackScreens() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerStyle: { backgroundColor: "#706fd3" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="List" component={SearchScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
}
