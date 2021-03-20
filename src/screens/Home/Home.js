import React from "react";
import { StyleSheet, View, Image } from "react-native";
import logo from "/assets/umami.png";

const Home = () => {
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
    </View>
  );
};

export default Home;
