import React from "react";
import { any } from "prop-types";
import { View, Text } from "react-native";

const ShoppingCart = (/* { navigation, route } */) => {
  return (
    <View>
      <Text>Shopping Cart!</Text>
    </View>
  );
};

ShoppingCart.propTypes = {
  navigation: any,
  route: any,
};

export default ShoppingCart;
