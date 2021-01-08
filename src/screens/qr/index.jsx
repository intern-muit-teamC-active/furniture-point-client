import React, { useState, useEffect } from "react";
import { Text, Button } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import { ENDPOINT } from "@env";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function QRScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [userid, setUserid] = useState("-1");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

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

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // TODO fetch
    fetch(`http://${ENDPOINT}/qr`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userid,
        qr_id: JSON.parse(data).qr_id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "SUCCESS") {
          // 認証成功
          const point = json.data.point_different;
          if (point < 0) {
            alert(
              `${point}ポイント使いました！残り${json.data.current_point}ポイントです`
            );
          } else {
            alert(`${point}ポイントゲットしました！`);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button
          title={"別のQRコードを読み込む"}
          onPress={() => setScanned(false)}
        />
      )}
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
