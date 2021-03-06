import React, { useState } from "react";
import { Text } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import { ENDPOINT } from "@env";

export default function QRScreen({ route, navigation }) {
  console.log(route);
  const { userid } = route.params;
  // TODO /getpoint
  // const [point, setPoint] = useState(null);
  // const [username, setUsername] = useState(null);

  // fetch(`http://${ENDPOINT}/getpoint`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     userid: userid,
  //   }),
  // })
  //   .then((response) => response.json())
  //   .then((json) => {
  //     if (json.status === "ok") {
  //       // 認証成功
  //       setPoint(json.point);
  //       setUsername(json.username);
  //     } else {
  //       // 認証失敗
  //       navigation.navigate("Login");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
