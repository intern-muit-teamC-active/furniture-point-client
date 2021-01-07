import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { ENDPOINT } from "@env";

export default function LoginScreen({ navigation }) {
  /** ユーザ名 */
  const [username, setUsername] = useState("");
  /** パスワード */
  const [password, setPassword] = useState("");
  /** 認証失敗か */
  const [isWrong, setIsWrong] = useState(false);
  /** 認証フォーム送信 */
  const autho = () => {
    return fetch(`http://${ENDPOINT}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "SUCCESS") {
          // 認証成功
          console.log(json);
          navigation.navigate("Top", {
            screen: "Home",
            params: {
              userid: json.data.user_id,
            },
          }); // トップ画面へ
        } else {
          // 認証失敗
          setIsWrong(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Input
        label="ユーザ名"
        placeholder="ユーザ名"
        leftIcon={{ type: "font-awesome", name: "user" }}
        onChangeText={(value) => setUsername(value)}
      />
      {isWrong ? (
        <Input
          label="パスワード"
          placeholder="パスワード"
          errorStyle={{ color: "red" }}
          leftIcon={{ type: "font-awesome", name: "lock" }}
          errorMessage="ユーザ名かパスワードが違います"
          onChangeText={(value) => setPassword(value)}
        />
      ) : (
        <Input
          label="パスワード"
          placeholder="パスワード"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(value) => setPassword(value)}
        />
      )}
      <Button title="ログイン" onPress={autho} />
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
