import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { SearchBar, ListItem } from "react-native-elements";

export default function SearchScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [text, setText] = useState("");
  const [productMode, setProductMode] = useState(false);
  //   const [productInfo, setProductInfo] = useState(initialState);

  useEffect(() => {
    fetch("http://192.168.0.18:3000/list")
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "ok") {
          // 認証成功
          setData(json.products);
          setResult(json.products);
        } else {
          // 認証失敗
          navigation.navigate("Login");
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const handlePress = (id) => {
    fetch("http://192.168.0.18:3000/product", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    }).then(() => setProductMode(true));
  };

  const searchFilter = (text) => {
    setLoading(true);
    setText(text);
    const newData = result.filter((item) => {
      const itemData = `${item.name.toUpperCase()} ${item.id.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setData(newData);
    setLoading(false);
  };

  const keyExtractor = (_item, index) => index.toString();

  const renderItem = ({ item }) => (
    <ListItem bottomDivider onPress={() => handlePress(item.id)}>
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>{item.id}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  if (productMode) {
    return <View></View>;
  } else {
    return (
      <View>
        <SearchBar
          placeholder="製品検索"
          lightTheme
          onChangeText={(text) => searchFilter(text)}
          autoCorrect={false}
          value={text}
        />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            keyExtractor={keyExtractor}
            data={data}
            renderItem={renderItem}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    justifyContent: "center",
  },
});
