import React, { useContext } from "react";
import { any } from "prop-types";
import { Text, StyleSheet, View, Image } from "react-native";
import { GlobalContext } from "/context/GlobalContext";
import logo from "/assets/umami.png";

import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Home = (/* { navigation, route } */) => {
  const {
    contactInfo: { locality, phone, street },
  } = useContext(GlobalContext);
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
      <Text>{windowWidth}</Text>
      <Text>{windowHeight}</Text>
      <View>
        <Text>### Contact Info ###</Text>
        {locality ? <Text>{locality}</Text> : null}
        {phone ? <Text>{phone}</Text> : null}
        {street ? <Text>{street}</Text> : null}
      </View>
    </View>
  );
};

Home.propTypes = {
  navigation: any,
  route: any,
};

export default Home;
