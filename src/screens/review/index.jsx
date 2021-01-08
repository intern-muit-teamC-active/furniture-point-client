import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
import { ENDPOINT } from "@env";

export default function ReviewScreen({ route, navigation }) {
  console.log(route);
  const { product } = route.params;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("reviewlist");
    fetch(`http://${ENDPOINT}/reviewlist`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: product.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "SUCCESS") {
          // 認証成功
          setData(json.reviews);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderItem = ({ item }) => (
    <ListItem>
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{item.recommend}</ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>
          {item.comment}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <ScrollView>
      <Text h1>{product.name}</Text>
      <Text h2>{product.price}円</Text>
      <Image
        source={{
          uri: `http://${ENDPOINT}/${product.imageurl}`,
        }}
        style={{ width: 200, height: 200 }}
        PlaceholderContent={<ActivityIndicator />}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList data={data} renderItem={renderItem} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    justifyContent: "center",
  },
});
