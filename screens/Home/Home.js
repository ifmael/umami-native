import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import SafeAreaViewAndroid from "../../components/common/SafeAreaViewAndroid";
import logo from "../../assets/umami.png";

import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Home = ({ navigation, route }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: 250,
      height: 250,
    },
  });

  return (
    <SafeAreaViewAndroid>
      <View style={styles.container}>
        <Image source={logo} style={styles.image} />
        <Text>{windowWidth}</Text>
        <Text>{windowHeight}</Text>
      </View>
    </SafeAreaViewAndroid>
  );
};

export default Home;
