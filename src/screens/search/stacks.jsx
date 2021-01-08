import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./index";
import ProductScreen from "../product/index";
import MapScreen from "../map/index";
import ReviewScreen from "../review/index";

export default function SearchStackScreens() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="List" options={{ headerShown: false }}>
      <Stack.Screen name="List" component={SearchScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
    </Stack.Navigator>
  );
}
