import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  FlatList,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { ListItem, Rating } from "react-native-elements";
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

  const renderKind = (kind) => {
    const text = kind === "purchase" ? "購入者レビュー" : "展示来場者レビュー";
    const status = kind === "purchase" ? "primary" : "success";
    return <Text>{text}</Text>;
  };

  const keyExtractor = (_item, index) => index.toString();

  const renderItem = ({ item }) => (
    <ListItem>
      <ListItem.Content>
        <ListItem.Title style={styles.title}>
          <Rating imageSize={20} readonly startingValue={item.recommend} />
          {renderKind(item.kind)}
        </ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>
          {item.comment}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              <Text h1>{product.name}</Text>
              <Text h2>{product.price}円</Text>
              <Image
                source={{
                  uri: `http://${ENDPOINT}/${product.imageurl}`,
                }}
                style={{ width: 200, height: 200 }}
                PlaceholderContent={<ActivityIndicator />}
              />
            </>
          }
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItem}
          ListFooterComponent={<View />}
        />
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
