import React, { useState } from "react";
import { Text } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import { ENDPOINT } from "@env";

export default function ProductScreen({ route, navigation }) {
  console.log(route);
  const { productid } = route.params;
  const [product, setProduct] = useState(null);
  // const [username, setUsername] = useState(null);

  fetch(`http://${ENDPOINT}/show`, {
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
        setProduct(json.product);
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <View style={styles.container}>
      <Text h1>{product.name}</Text>
      <Text h2>{product.price}円</Text>
      <Image
        source={{
          uri: `http://${ENDPOINT}:3000/${prodcut.imageurl}`,
        }}
        style={{ width: 200, height: 200 }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Button
        title="店舗内の場所を見る"
        onPress={() =>
          navigation.navigate("Map", {
            productid: product.id,
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
