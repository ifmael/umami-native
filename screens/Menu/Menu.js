import React, { useContext } from "react";
import { Text, StyleSheet, View } from "react-native";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import MenuList from "../../components/Menu/MenuList";

const Menu = () => {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.otf"),
  });

  const styles = StyleSheet.create({
    title: {
      fontFamily: "Montserrat-Regular",
      fontSize: 32,
      padding: 10,
      textAlign: "center",
    },
    container: {
      justifyContent: "center",
      borderBottomWidth: 1,
      borderBottomColor: "black",
    },
  });

  return !fontsLoaded ? (
    <AppLoading />
  ) : (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Menú</Text>
      </View>
      <MenuList />
    </>
  );
};

export default Menu;
