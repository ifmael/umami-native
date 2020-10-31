import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Images from "../../../assets/images.js";

const MenuItem = ({ id, name, color, slug }) => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../../../assets/fonts/Montserrat-Regular.otf"),
  });
  const styles = StyleSheet.create({
    container: {
      paddingVertical: 50,
      marginHorizontal: 30,
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
      borderBottomColor: "black",
      borderBottomWidth: 1,
    },
    image: {
      width: 100,
      height: 80,
    },
    name: {
      fontFamily: "Montserrat-Regular",
      fontSize: 24,
      marginLeft: 30,
      color: color,
    },
  });

  const navigateToCategory = () => {
    navigation.navigate("Product", { slug });
  };

  return (
    <View style={styles.container}>
      <Image source={Images.menu[id]} style={styles.image} />
      <TouchableOpacity onPress={navigateToCategory}>
        <Text style={styles.name}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuItem;
