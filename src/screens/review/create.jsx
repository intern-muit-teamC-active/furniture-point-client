import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { ENDPOINT } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

export default function ReviewCreateScreen({ route, navigation }) {
  const { product } = route.params;
  const [comment, setComment] = useState("");
  const [recommend, setRecommend] = useState("1");
  const [kind, setKind] = useState("0");
  const [userid, setUserid] = useState("0");

  useEffect(() => {
    (async () => {
      try {
        const useridFromServer = await AsyncStorage.getItem("@userid");
        if (useridFromServer != null) {
          setUserid(useridFromServer);
        }
      } catch (error) {
        // 設定読み込みエラー
        console.log(error);
      }
    })();
  }, []);
  /** 認証フォーム送信 */
  const sendCommnet = () => {
    return fetch(`http://${ENDPOINT}/review`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: product.id,
        kind: parseInt(kind),
        comment: comment,
        recommend: parseInt(recommend),
        user_id: userid,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "SUCCESS") {
          // 認証成功
          alert(`投稿完了しました。${json.add_point}ポイント獲得しました`);
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text h4>購入か展示か</Text>
        <Picker
          selectedValue={kind}
          tyle={styles.picker}
          onValueChange={(itemValue, itemIndex) => {
            setKind(itemValue);
          }}
        >
          <Picker.Item label="購入後レビュー" value="0" />
          <Picker.Item label="展示を見てのレビュー" value="1" />
        </Picker>
        <Text h4>おすすめ度</Text>
        <Picker
          selectedValue={recommend}
          tyle={styles.picker}
          onValueChange={(itemValue, itemIndex) => {
            setRecommend(itemValue);
          }}
        >
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
        </Picker>
        <Input
          label="コメント"
          placeholder="コメント"
          leftIcon={{ type: "font-awesome", name: "comment" }}
          onChangeText={(value) => setComment(value)}
        />
        <Button title="投稿" onPress={sendCommnet} />
      </ScrollView>
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
});
