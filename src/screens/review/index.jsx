import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
import { ENDPOINT } from "@env";

export default function ReviewScreen({ route, navigation }) {
  console.log(route);
  const { productid } = route.params;
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
        product_id: productid,
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
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList data={data} renderItem={renderItem} />
      )}
    </View>
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
