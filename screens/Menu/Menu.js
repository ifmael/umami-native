import React from "react";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import MenuList from "../../components/Menu/MenuList";

const Menu = () => {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.otf"),
  });

  return !fontsLoaded ? <AppLoading /> : <MenuList />;
};

export default Menu;
