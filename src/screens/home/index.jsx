import React, { useState, useEffect } from "react";
import { Text, Image } from "react-native-elements";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { ENDPOINT } from "@env";

export default function HomeScreen({ route, navigation }) {
  const { userid } = route.params;
  const [point, setPoint] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch(`http://${ENDPOINT}/getpoint`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userid,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "SUCCESS") {
          // 認証成功
          setPoint(json.data.point);
          setUsername(json.data.username);
        } else {
          // 認証失敗
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text h2>こんにちは{username}さん</Text>
      <Text h1>{point}ポイント</Text>
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
