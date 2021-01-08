import React, { useState, useEffect } from "react";
import { Text, Image } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import { ENDPOINT } from "@env";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator } from "react-native";

export default function MapScreen({ route, navigation }) {
  const { productid } = route.params;
  const [map, setMap] = useState(null);
  const [shopid, setShopid] = useState(0);

  useEffect(() => {
    if (shopid !== 0) {
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
            setMap(json.data.map_url);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [shopid]);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={shopid.toString()}
        tyle={styles.picker}
        onValueChange={(itemValue, itemIndex) => {
          if (itemValue !== "none") {
            setShopid(parseInt(itemValue));
          }
        }}
      >
        <Picker.Item label="選択なし" value="0" />
        <Picker.Item label="東京" value="1" />
        <Picker.Item label="大阪" value="2" />
      </Picker>
      {shopid === 0 ? (
        <ActivityIndicator />
      ) : (
        <Image
          source={{
            uri: `http://${ENDPOINT}/${map}`,
          }}
          style={{ width: 200, height: 200 }}
          PlaceholderContent={<Text>店舗を選んでください</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  picker: { width: 200 },
});
