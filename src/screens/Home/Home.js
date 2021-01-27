import React, { useContext } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, ThemeContext } from "react-native-elements";

import logo from "/assets/umami.png";
import { any } from "prop-types";

import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

const Home = (/* { navigation, route } */) => {
  const { theme } = useContext(ThemeContext);
  console.log("theme");
  console.log(theme);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
    },
    image: {
      width: 250,
      height: 250,
    },
  });

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text h2>{windowWidth}</Text>
      {/* <Text>{windowHeight}</Text> */}
    </View>
  );
};

Home.propTypes = {
  navigation: any,
  route: any,
};

export default Home;
