import React, { useState, useEffect } from "react";
import { Text } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import { ENDPOINT } from "@env";
import { Picker } from "@react-native-picker/picker";

export default function MapScreen({ route, navigation }) {
  console.log(route);
  const { productid } = route.params;
  const [map, setMap] = useState(null);
  const [shopid, setShopid] = useState(1);

  useEffect(() => {
    fetch(`http://${ENDPOINT}/getposition`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: productid,
        shop_id: shopid,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "SUCCESS") {
          // 認証成功
          setMap(json.map_image);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={shopid}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setShopid(itemValue)}
      >
        <Picker.Item label="東京" value={1} />
        <Picker.Item label="大阪" value={2} />
      </Picker>
      <Image
        source={{
          uri: `http://${ENDPOINT}:3000/${map}`,
        }}
        style={{ width: 200, height: 200 }}
        PlaceholderContent={<Text>店舗を選んでください</Text>}
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
