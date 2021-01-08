import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
import { ENDPOINT } from "@env";

export default function SearchScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`http://${ENDPOINT}/list`)
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "SUCCESS") {
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

  // TODO
  const handlePress = (id) => {
    navigation.navigate("Product", { productid: id });
  };

  const searchFilter = (text) => {
    setLoading(true);
    setText(text);
    const newData = result.filter((item) => {
      const itemData = `${item.name.toUpperCase()}`;

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
        <ListItem.Subtitle style={styles.subtitle}>
          <Text>{item.price}円</Text>
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    justifyContent: "center",
  },
});
